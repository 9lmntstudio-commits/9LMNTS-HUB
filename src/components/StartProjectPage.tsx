import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Send, Calendar, Users, Target, Zap } from 'lucide-react';

interface StartProjectPageProps {
  selectedPlan?: string;
  onNavigate: (page: string) => void;
}

const plans = [
  {
    value: 'starter',
    name: 'Starter Event',
    price: '$2,500 CAD',
    features: ['Up to 100 attendees', 'Basic branding', '4-hour event', 'Standard support']
  },
  {
    value: 'professional',
    name: 'Professional Event',
    price: '$7,500 CAD',
    features: ['Up to 500 attendees', 'Custom branding', '8-hour event', 'Priority support']
  },
  {
    value: 'enterprise',
    name: 'Enterprise Event',
    price: '$15,000 CAD',
    features: ['Unlimited attendees', 'Full customization', 'Multi-day event', 'Dedicated support']
  }
];

export function StartProjectPage({ selectedPlan, onNavigate }: StartProjectPageProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    plan: selectedPlan || '',
    projectType: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    description: ''
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Prepare data for n8n webhook
      const webhookData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        plan_selected: plans.find(p => p.value === formData.plan)?.name || formData.plan,
        project_description: formData.description,
        project_type: formData.projectType,
        timeline: formData.timeline,
        website: formData.website,
        revenue: plans.find(p => p.value === formData.plan)?.price || 'TBD',
        location: 'TBD'
      };

      const response = await fetch('https://loax9lmnts.app.n8n.cloud/webhook/instant-lead-engine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit project: ${response.statusText}`);
      }

      setStep(5); // Show success message
    } catch (error) {
      console.error('Error submitting project:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.plan !== '';
      case 2:
        return formData.projectType !== '' && formData.timeline !== '';
      case 3:
        return formData.name !== '' && formData.email !== '';
      case 4:
        return formData.description !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('pricing')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Pricing
          </button>
          
          <h1 className="text-4xl text-white mb-4">Start Your Project</h1>
          <p className="text-gray-400 text-lg">
            Let's create an unforgettable experience for your audience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step >= stepNum 
                      ? 'bg-[#FF7A00] text-[#1A1A1A]' 
                      : 'bg-[#333333] text-gray-500'
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div 
                    className={`w-20 h-1 mx-2 transition-all ${
                      step > stepNum ? 'bg-[#FF7A00]' : 'bg-[#333333]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-[#0D1829] rounded-2xl p-8 border border-[#00D4FF]/20">
          {/* Step 1: Select Plan */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl text-white mb-6">Choose Your Plan</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.value}
                    onClick={() => setFormData({ ...formData, plan: plan.value })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.plan === plan.value
                        ? 'border-[#FF7A00] bg-[#FF7A00]/10'
                        : 'border-[#333333] hover:border-[#FF7A00]/50'
                    }`}
                  >
                    <h3 className="text-xl text-white mb-2">{plan.name}</h3>
                    <div className="text-2xl text-[#FF7A00] mb-4">{plan.price}</div>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check size={16} className="text-[#FF7A00] mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl text-white mb-6">Project Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-[#FF7A00]"
                  >
                    <option value="">Select project type</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="conference">Conference</option>
                    <option value="festival">Music Festival</option>
                    <option value="sports">Sports Event</option>
                    <option value="community">Community Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-[#FF7A00]"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="3-4-weeks">3-4 weeks</option>
                    <option value="1-2-months">1-2 months</option>
                    <option value="3+ months">3+ months</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl text-white mb-6">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Project Description */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl text-white mb-6">Project Description</h2>
              <div>
                <label className="block text-gray-400 mb-2">Tell us about your project *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                  placeholder="Describe your event, goals, audience, and any special requirements..."
                />
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#FF7A00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-[#FF7A00]" />
              </div>
              <h2 className="text-3xl text-white mb-4">Project Submitted!</h2>
              <p className="text-gray-400 mb-8">
                Thank you for your interest! We'll review your project details and get back to you within 24 hours.
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="px-8 py-3 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all"
              >
                Back to Home
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`px-6 py-3 rounded-lg transition-all ${
                  step === 1
                    ? 'bg-[#333333] text-gray-500 cursor-not-allowed'
                    : 'bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/80'
                }`}
              >
                Back
              </button>

              {step === 4 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Project
                      <Check size={20} />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`px-8 py-3 rounded-lg transition-all inline-flex items-center gap-2 ${
                    isStepValid()
                      ? 'bg-[#FF7A00] text-[#1A1A1A] hover:bg-[#FF7A00]/90'
                      : 'bg-[#333333] text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{submitError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
