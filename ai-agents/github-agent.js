// GitHub Agent - Automated Repository Management
const { Octokit } = require("@octokit/rest");

class GitHubAgent {
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
  }

  async createProjectRepo(projectName, clientName, platformType) {
    const repoName = `${clientName.toLowerCase().replace(/\s+/g, '-')}-${platformType}`;
    
    try {
      // Create repository
      const repo = await this.octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: `${platformType} platform for ${clientName}`,
        private: true,
        auto_init: true
      });

      // Add project structure
      await this.setupProjectStructure(repo.data.owner.login, repoName, platformType);
      
      console.log(`✅ Created repo: ${repo.data.html_url}`);
      return repo.data;
    } catch (error) {
      console.error('❌ Error creating repo:', error);
      throw error;
    }
  }

  async setupProjectStructure(owner, repo, platformType) {
    const structure = {
      'README.md': `# ${platformType} Platform\n\nClient project for 9LMNTS Studio.\n\n## Deployment\n\nThis project auto-deploys to Netlify on push to main.\n\n## Development\n\n- Run \`npm install\`\n- Run \`npm run dev\`\n\n## Support\n\nContact: 9lmntstudio@gmail.com`,
      '.gitignore': `node_modules\ndist\n.env\n.env.local\n.DS_Store\n*.log`,
      'package.json': JSON.stringify({
        name: repo,
        version: "1.0.0",
        scripts: {
          "dev": "vite",
          "build": "vite build",
          "preview": "vite preview"
        },
        dependencies: {
          "react": "^18.3.1",
          "react-dom": "^18.3.1"
        },
        devDependencies: {
          "@vitejs/plugin-react": "^4.0.0",
          "vite": "^4.4.0"
        }
      }, null, 2),
      'vite.config.js': `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n  base: '/',\n  build: {\n    outDir: 'dist'\n  }\n})`,
      'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${platformType} - 9LMNTS Studio</title>\n</head>\n<body>\n  <div id="root"></div>\n  <script type="module" src="/src/main.jsx"></script>\n</body>\n</html>`,
      'src/main.jsx': `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.jsx'\nimport './index.css'\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n)`,
      'src/App.jsx': `import React from 'react'\nimport './App.css'\n\nfunction App() {\n  return (\n    <div className="app">\n      <h1>${platformType} Platform</h1>\n      <p>Built by 9LMNTS Studio</p>\n    </div>\n  )\n}\n\nexport default App`,
      'src/App.css': `* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n.app {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n}\n\np {\n  font-size: 1.2rem;\n  opacity: 0.8;\n}`,
      'src/index.css': `body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}`
    };

    // Add all files
    for (const [filePath, content] of Object.entries(structure)) {
      await this.octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        message: `Add ${filePath}`,
        content: Buffer.from(content).toString('base64')
      });
    }

    // Setup GitHub Actions for Netlify deployment
    const workflow = `name: Deploy to Netlify\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      \n      - name: Setup Node\n        uses: actions/setup-node@v3\n        with:\n          node-version: '18'\n          cache: 'npm'\n      \n      - name: Install dependencies\n        run: npm ci\n      \n      - name: Build\n        run: npm run build\n      \n      - name: Deploy to Netlify\n        uses: nwtgck/actions-netlify@v2\n        with:\n          publish-dir: './dist'\n          production-branch: main\n          github-token: \${{ secrets.GITHUB_TOKEN }}\n          deploy-message: "Deploy from GitHub Actions"\n          enable-pull-request-comment: false\n          enable-commit-comment: false\n        env:\n          NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}\n          NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}`;

    await this.octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: '.github/workflows/deploy.yml',
      message: 'Setup Netlify deployment',
      content: Buffer.from(workflow).toString('base64')
    });

    console.log(`✅ Project structure created for ${repo}`);
  }
}

module.exports = GitHubAgent;
