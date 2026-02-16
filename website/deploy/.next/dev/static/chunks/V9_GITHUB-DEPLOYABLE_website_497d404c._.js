(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Home() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(62);
    if ($[0] !== "1300568f566998596df8a7466a0d4fe4cfc9f7377da971f8c7090d7fb3935efc") {
        for(let $i = 0; $i < 62; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1300568f566998596df8a7466a0d4fe4cfc9f7377da971f8c7090d7fb3935efc";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            name: "",
            email: "",
            phone: "",
            service: "",
            message: ""
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    let t1;
    if ($[2] !== formData) {
        t1 = ({
            "Home[handleSubmit]": (e)=>{
                e.preventDefault();
                fetch("https://ixlmnts.app.n8n.cloud/webhook/9lmnts-leads", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...formData,
                        source: "website",
                        timestamp: new Date().toISOString()
                    })
                }).then(_HomeHandleSubmitAnonymous).then({
                    "Home[handleSubmit > (anonymous)()]": (data)=>{
                        alert("Thank you for your inquiry! We will contact you within 24 hours.");
                        setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            service: "",
                            message: ""
                        });
                    }
                }["Home[handleSubmit > (anonymous)()]"]).catch(_HomeHandleSubmitAnonymous2);
            }
        })["Home[handleSubmit]"];
        $[2] = formData;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const handleSubmit = t1;
    let t2;
    if ($[4] !== formData) {
        t2 = ({
            "Home[handleChange]": (e_0)=>{
                setFormData({
                    ...formData,
                    [e_0.target.name]: e_0.target.value
                });
            }
        })["Home[handleChange]"];
        $[4] = formData;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const handleChange = t2;
    let t3;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold text-gray-900",
                children: "🚀 9LMNTS STUDIO"
            }, void 0, false, {
                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                lineNumber: 80,
                columnNumber: 45
            }, this)
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 80,
            columnNumber: 10
        }, this);
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "bg-white shadow-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center py-6",
                    children: [
                        t3,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden md:flex space-x-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#services",
                                    className: "text-gray-700 hover:text-blue-600",
                                    children: "Services"
                                }, void 0, false, {
                                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 207
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#contact",
                                    className: "text-gray-700 hover:text-blue-600",
                                    children: "Contact"
                                }, void 0, false, {
                                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 285
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                            lineNumber: 87,
                            columnNumber: 165
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 87,
                    columnNumber: 105
                }, this)
            }, void 0, false, {
                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                lineNumber: 87,
                columnNumber: 49
            }, this)
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 87,
            columnNumber: 10
        }, this);
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    let t6;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-4xl md:text-6xl font-bold text-gray-900 mb-6",
            children: "AI POWERED SOLUTIONS"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 95,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xl text-gray-600 mb-8 max-w-3xl mx-auto",
            children: "Get your business automated with our cutting-edge AI services. Complete workflow automation, process optimization, and revenue acceleration."
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 96,
            columnNumber: 10
        }, this);
        $[8] = t5;
        $[9] = t6;
    } else {
        t5 = $[8];
        t6 = $[9];
    }
    let t7;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "py-20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
                children: [
                    t5,
                    t6,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row gap-4 justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://PayPal.Me/9LMNTSSTUDIO/2000",
                                className: "bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition",
                                children: "Get Started - AI Brand Voice $2,000"
                            }, void 0, false, {
                                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                lineNumber: 105,
                                columnNumber: 177
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://PayPal.Me/9LMNTSSTUDIO/3000",
                                className: "bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition",
                                children: "Premium Automation $3,000"
                            }, void 0, false, {
                                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                lineNumber: 105,
                                columnNumber: 361
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                        lineNumber: 105,
                        columnNumber: 113
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                lineNumber: 105,
                columnNumber: 37
            }, this)
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 105,
            columnNumber: 10
        }, this);
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-3xl font-bold text-center text-gray-900 mb-12",
            children: "Our Services"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 112,
            columnNumber: 10
        }, this);
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-50 p-8 rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-blue-600 text-3xl mb-4",
                    children: "🤖"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 119,
                    columnNumber: 53
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    className: "text-xl font-bold mb-4",
                    children: "AI Brand Voice"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 119,
                    columnNumber: 106
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 mb-4",
                    children: "AI-powered content strategy, automated social media management, brand voice consistency"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 119,
                    columnNumber: 164
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-2xl font-bold text-blue-600",
                    children: "$2,000"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 119,
                    columnNumber: 289
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "https://PayPal.Me/9LMNTSSTUDIO/2000",
                    className: "inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700",
                    children: "Get Started"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 119,
                    columnNumber: 351
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 119,
            columnNumber: 10
        }, this);
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-50 p-8 rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-green-600 text-3xl mb-4",
                    children: "🎨"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 126,
                    columnNumber: 54
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    className: "text-xl font-bold mb-4",
                    children: "Web Design"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 126,
                    columnNumber: 108
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 mb-4",
                    children: "Modern, responsive design, AI integration, SEO optimization"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 126,
                    columnNumber: 162
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-2xl font-bold text-green-600",
                    children: "$1,500"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 126,
                    columnNumber: 259
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "https://PayPal.Me/9LMNTSSTUDIO/1500",
                    className: "inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700",
                    children: "Get Started"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 126,
                    columnNumber: 322
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 126,
            columnNumber: 11
        }, this);
        $[13] = t10;
    } else {
        t10 = $[13];
    }
    let t11;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-50 p-8 rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-purple-600 text-3xl mb-4",
                    children: "⚡"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 133,
                    columnNumber: 54
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    className: "text-xl font-bold mb-4",
                    children: "AI Business Automation"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 133,
                    columnNumber: 108
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 mb-4",
                    children: "Complete workflow automation, process optimization, revenue acceleration"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 133,
                    columnNumber: 174
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-2xl font-bold text-purple-600",
                    children: "$3,000"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 133,
                    columnNumber: 284
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "https://PayPal.Me/9LMNTSSTUDIO/3000",
                    className: "inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700",
                    children: "Get Started"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 133,
                    columnNumber: 348
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 133,
            columnNumber: 11
        }, this);
        $[14] = t11;
    } else {
        t11 = $[14];
    }
    let t12;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-50 p-8 rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-orange-600 text-3xl mb-4",
                    children: "🎯"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 140,
                    columnNumber: 54
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    className: "text-xl font-bold mb-4",
                    children: "EventOS Platform"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 140,
                    columnNumber: 109
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 mb-4",
                    children: "Event management automation, AI-powered operations, white-label rights"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 140,
                    columnNumber: 169
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-2xl font-bold text-orange-600",
                    children: "$1,000"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 140,
                    columnNumber: 277
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "https://PayPal.Me/9LMNTSSTUDIO/1000",
                    className: "inline-block mt-4 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700",
                    children: "Get Started"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 140,
                    columnNumber: 341
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 140,
            columnNumber: 11
        }, this);
        $[15] = t12;
    } else {
        t12 = $[15];
    }
    let t13;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "services",
            className: "py-20 bg-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [
                    t8,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
                        children: [
                            t9,
                            t10,
                            t11,
                            t12,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-50 p-8 rounded-lg border-2 border-red-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-red-600 text-3xl mb-4",
                                        children: "🔥"
                                    }, void 0, false, {
                                        fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 265
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-xl font-bold mb-4",
                                        children: "SPECIAL OFFER"
                                    }, void 0, false, {
                                        fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 317
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 mb-4",
                                        children: "20% OFF projects $3,000+. Premium packages, enterprise solutions, custom AI development"
                                    }, void 0, false, {
                                        fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 374
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-bold text-red-600",
                                        children: "Save 20%"
                                    }, void 0, false, {
                                        fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 499
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://PayPal.Me/9LMNTSSTUDIO/2400",
                                        className: "inline-block mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700",
                                        children: "Get Discount"
                                    }, void 0, false, {
                                        fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 562
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                lineNumber: 147,
                                columnNumber: 198
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                        lineNumber: 147,
                        columnNumber: 121
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                lineNumber: 147,
                columnNumber: 61
            }, this)
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 147,
            columnNumber: 11
        }, this);
        $[16] = t13;
    } else {
        t13 = $[16];
    }
    let t14;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-3xl font-bold text-center text-gray-900 mb-12",
            children: "Contact Us"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 154,
            columnNumber: 11
        }, this);
        $[17] = t14;
    } else {
        t14 = $[17];
    }
    let t15;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-gray-700 mb-2",
            children: "Name *"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 161,
            columnNumber: 11
        }, this);
        $[18] = t15;
    } else {
        t15 = $[18];
    }
    let t16;
    if ($[19] !== formData.name || $[20] !== handleChange) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t15,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    name: "name",
                    required: true,
                    value: formData.name,
                    onChange: handleChange,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 168,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 168,
            columnNumber: 11
        }, this);
        $[19] = formData.name;
        $[20] = handleChange;
        $[21] = t16;
    } else {
        t16 = $[21];
    }
    let t17;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-gray-700 mb-2",
            children: "Email *"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[22] = t17;
    } else {
        t17 = $[22];
    }
    let t18;
    if ($[23] !== formData.email || $[24] !== handleChange) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t17,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "email",
                    name: "email",
                    required: true,
                    value: formData.email,
                    onChange: handleChange,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 184,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 184,
            columnNumber: 11
        }, this);
        $[23] = formData.email;
        $[24] = handleChange;
        $[25] = t18;
    } else {
        t18 = $[25];
    }
    let t19;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-gray-700 mb-2",
            children: "Phone"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 193,
            columnNumber: 11
        }, this);
        $[26] = t19;
    } else {
        t19 = $[26];
    }
    let t20;
    if ($[27] !== formData.phone || $[28] !== handleChange) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t19,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "tel",
                    name: "phone",
                    value: formData.phone,
                    onChange: handleChange,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 200,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 200,
            columnNumber: 11
        }, this);
        $[27] = formData.phone;
        $[28] = handleChange;
        $[29] = t20;
    } else {
        t20 = $[29];
    }
    let t21;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-gray-700 mb-2",
            children: "Service Interest *"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 209,
            columnNumber: 11
        }, this);
        $[30] = t21;
    } else {
        t21 = $[30];
    }
    let t22;
    let t23;
    let t24;
    let t25;
    let t26;
    let t27;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "",
            children: "Select a service"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 221,
            columnNumber: 11
        }, this);
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "ai-brand-voice",
            children: "AI Brand Voice - $2,000"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 222,
            columnNumber: 11
        }, this);
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "web-design",
            children: "Web Design - $1,500"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 223,
            columnNumber: 11
        }, this);
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "ai-automation",
            children: "AI Business Automation - $3,000"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 224,
            columnNumber: 11
        }, this);
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "eventos",
            children: "EventOS Platform - $1,000"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 225,
            columnNumber: 11
        }, this);
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "custom",
            children: "Custom Solution"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 226,
            columnNumber: 11
        }, this);
        $[31] = t22;
        $[32] = t23;
        $[33] = t24;
        $[34] = t25;
        $[35] = t26;
        $[36] = t27;
    } else {
        t22 = $[31];
        t23 = $[32];
        t24 = $[33];
        t25 = $[34];
        t26 = $[35];
        t27 = $[36];
    }
    let t28;
    if ($[37] !== formData.service || $[38] !== handleChange) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t21,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    name: "service",
                    required: true,
                    value: formData.service,
                    onChange: handleChange,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    children: [
                        t22,
                        t23,
                        t24,
                        t25,
                        t26,
                        t27
                    ]
                }, void 0, true, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 243,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 243,
            columnNumber: 11
        }, this);
        $[37] = formData.service;
        $[38] = handleChange;
        $[39] = t28;
    } else {
        t28 = $[39];
    }
    let t29;
    if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-gray-700 mb-2",
            children: "Message"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 252,
            columnNumber: 11
        }, this);
        $[40] = t29;
    } else {
        t29 = $[40];
    }
    let t30;
    if ($[41] !== formData.message || $[42] !== handleChange) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t29,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    name: "message",
                    rows: 4,
                    value: formData.message,
                    onChange: handleChange,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 259,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 259,
            columnNumber: 11
        }, this);
        $[41] = formData.message;
        $[42] = handleChange;
        $[43] = t30;
    } else {
        t30 = $[43];
    }
    let t31;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "submit",
            className: "w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition",
            children: "Send Message"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 268,
            columnNumber: 11
        }, this);
        $[44] = t31;
    } else {
        t31 = $[44];
    }
    let t32;
    if ($[45] !== handleSubmit || $[46] !== t16 || $[47] !== t18 || $[48] !== t20 || $[49] !== t28 || $[50] !== t30) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-6",
                children: [
                    t16,
                    t18,
                    t20,
                    t28,
                    t30,
                    t31
                ]
            }, void 0, true, {
                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                lineNumber: 275,
                columnNumber: 16
            }, this)
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 275,
            columnNumber: 11
        }, this);
        $[45] = handleSubmit;
        $[46] = t16;
        $[47] = t18;
        $[48] = t20;
        $[49] = t28;
        $[50] = t30;
        $[51] = t32;
    } else {
        t32 = $[51];
    }
    let t33;
    if ($[52] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
            className: "text-xl font-bold mb-6",
            children: "Get in Touch"
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 288,
            columnNumber: 11
        }, this);
        $[52] = t33;
    } else {
        t33 = $[52];
    }
    let t34;
    if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-blue-600 mr-3",
                    children: "📧"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 295,
                    columnNumber: 46
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-semibold",
                            children: "Email"
                        }, void 0, false, {
                            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                            lineNumber: 295,
                            columnNumber: 97
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-gray-600",
                            children: "9lmntstudio@gmail.com"
                        }, void 0, false, {
                            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                            lineNumber: 295,
                            columnNumber: 139
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 295,
                    columnNumber: 92
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 295,
            columnNumber: 11
        }, this);
        $[53] = t34;
    } else {
        t34 = $[53];
    }
    let t35;
    if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-green-600 mr-3",
                    children: "📞"
                }, void 0, false, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 302,
                    columnNumber: 46
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-semibold",
                            children: "Phone"
                        }, void 0, false, {
                            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                            lineNumber: 302,
                            columnNumber: 98
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-gray-600",
                            children: "(343) 262-8842"
                        }, void 0, false, {
                            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                            lineNumber: 302,
                            columnNumber: 140
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 302,
                    columnNumber: 93
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 302,
            columnNumber: 11
        }, this);
        $[54] = t35;
    } else {
        t35 = $[54];
    }
    let t36;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                t34,
                t35,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-purple-600 mr-3",
                            children: "🌐"
                        }, void 0, false, {
                            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                            lineNumber: 309,
                            columnNumber: 83
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-semibold",
                                    children: "Website"
                                }, void 0, false, {
                                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                    lineNumber: 309,
                                    columnNumber: 136
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-600",
                                    children: "9lmntsstudio.com"
                                }, void 0, false, {
                                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                    lineNumber: 309,
                                    columnNumber: 180
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                            lineNumber: 309,
                            columnNumber: 131
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 309,
                    columnNumber: 48
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 309,
            columnNumber: 11
        }, this);
        $[55] = t36;
    } else {
        t36 = $[55];
    }
    let t37;
    if ($[56] === Symbol.for("react.memo_cache_sentinel")) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-8 rounded-lg shadow-sm",
                children: [
                    t33,
                    t36,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 p-4 bg-blue-50 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                className: "font-bold mb-2",
                                children: "🎉 ACT NOW - AUTOMATION STARTS IMMEDIATELY!"
                            }, void 0, false, {
                                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                lineNumber: 316,
                                columnNumber: 125
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: "Contact us today and start your AI-powered business transformation. All services include immediate setup and ongoing support."
                            }, void 0, false, {
                                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                                lineNumber: 316,
                                columnNumber: 204
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                        lineNumber: 316,
                        columnNumber: 77
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                lineNumber: 316,
                columnNumber: 16
            }, this)
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 316,
            columnNumber: 11
        }, this);
        $[56] = t37;
    } else {
        t37 = $[56];
    }
    let t38;
    if ($[57] !== t32) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "contact",
            className: "py-20 bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [
                    t14,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-12",
                        children: [
                            t32,
                            t37
                        ]
                    }, void 0, true, {
                        fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                        lineNumber: 323,
                        columnNumber: 123
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                lineNumber: 323,
                columnNumber: 62
            }, this)
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 323,
            columnNumber: 11
        }, this);
        $[57] = t32;
        $[58] = t38;
    } else {
        t38 = $[58];
    }
    let t39;
    if ($[59] === Symbol.for("react.memo_cache_sentinel")) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "bg-gray-900 text-white py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "© 2024 9LMNTS STUDIO. All rights reserved."
                        }, void 0, false, {
                            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                            lineNumber: 331,
                            columnNumber: 145
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-gray-400",
                            children: "AI-powered automation solutions for modern businesses."
                        }, void 0, false, {
                            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                            lineNumber: 331,
                            columnNumber: 194
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                    lineNumber: 331,
                    columnNumber: 116
                }, this)
            }, void 0, false, {
                fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
                lineNumber: 331,
                columnNumber: 60
            }, this)
        }, void 0, false, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 331,
            columnNumber: 11
        }, this);
        $[59] = t39;
    } else {
        t39 = $[59];
    }
    let t40;
    if ($[60] !== t38) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100",
            children: [
                t4,
                t7,
                t13,
                t38,
                t39
            ]
        }, void 0, true, {
            fileName: "[project]/V9/GITHUB-DEPLOYABLE/website/src/app/page.tsx",
            lineNumber: 338,
            columnNumber: 11
        }, this);
        $[60] = t38;
        $[61] = t40;
    } else {
        t40 = $[61];
    }
    return t40;
}
_s(Home, "AVhEfndA4vGEUeeFDmvQFHKomrk=");
_c = Home;
function _HomeHandleSubmitAnonymous2(error) {
    alert("Error submitting form. Please contact us directly at 9lmntstudio@gmail.com");
}
function _HomeHandleSubmitAnonymous(response) {
    return response.json();
}
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-compiler-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    var ReactSharedInternals = __turbopack_context__.r("[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)").__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    exports.c = function(size) {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher.useMemoCache(size);
    };
}();
}),
"[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$V9$2f$GITHUB$2d$DEPLOYABLE$2f$website$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/V9/GITHUB-DEPLOYABLE/website/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=V9_GITHUB-DEPLOYABLE_website_497d404c._.js.map