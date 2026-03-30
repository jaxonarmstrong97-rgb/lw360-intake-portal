import React, { useState, useCallback } from 'react';

// Supabase config
const SUPABASE_URL = 'https://aetyraaujylcqhmkozkv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFldHlyYWF1anlsY3FobWtvemt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MTk2MjQsImV4cCI6MjA1NzM5NTYyNH0.NaKeBpGchvyjmFBCUBjQPSygyY2KuCT3Rh3gGPy4kSo';

// Brand colors
const COLORS = {
  navy: '#1A395C',
  lime: '#7AC143',
  sky: '#29ABE2',
  white: '#FFFFFF',
  gray: '#F5F7FA',
  darkGray: '#4A5568',
  lightGray: '#E2E8F0',
  red: '#E53E3E',
  orange: '#ED8936'
};

// Entity types
const ENTITY_TYPES = [
  'LLC',
  'S-Corp',
  'C-Corp',
  'Partnership',
  'Sole Prop',
  'Government',
  'School District',
  'Non-Profit'
];

// Pay frequencies
const PAY_FREQUENCIES = [
  'Weekly',
  'Biweekly',
  'Semi-Monthly',
  'Monthly'
];

// Payroll providers
const PAYROLL_PROVIDERS = [
  'ADP',
  'Paychex',
  'Gusto',
  'QuickBooks',
  'Paylocity',
  'Paycom',
  'Ceridian',
  'UKG (Kronos)',
  'Workday',
  'In-House',
  'Other'
];

// Generate enrollment code from company name
function generateCode(name) {
  const base = name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  const year = new Date().getFullYear();
  return `${base}${year}`;
}

// Form section component
function FormSection({ title, description, children, number }) {
  return (
    <div style={{
      background: COLORS.white,
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${COLORS.lime}, ${COLORS.sky})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: COLORS.white,
          fontWeight: '700',
          fontSize: '16px',
          flexShrink: 0
        }}>
          {number}
        </div>
        <div>
          <h2 style={{
            margin: '0 0 4px 0',
            fontSize: '20px',
            fontWeight: '600',
            color: COLORS.navy
          }}>{title}</h2>
          {description && (
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: COLORS.darkGray,
              lineHeight: '1.5'
            }}>{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

// Input field component
function FormField({ label, required, children, hint, error }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        marginBottom: '6px',
        fontSize: '14px',
        fontWeight: '500',
        color: COLORS.navy
      }}>
        {label}
        {required && <span style={{ color: COLORS.red, marginLeft: '4px' }}>*</span>}
      </label>
      {children}
      {hint && !error && (
        <p style={{ margin: '6px 0 0', fontSize: '12px', color: COLORS.darkGray }}>{hint}</p>
      )}
      {error && (
        <p style={{ margin: '6px 0 0', fontSize: '12px', color: COLORS.red }}>{error}</p>
      )}
    </div>
  );
}

// Text input component
function TextInput({ value, onChange, placeholder, type = 'text', disabled }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '12px 16px',
        fontSize: '15px',
        border: `1px solid ${COLORS.lightGray}`,
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxSizing: 'border-box',
        background: disabled ? COLORS.gray : COLORS.white
      }}
      onFocus={(e) => {
        e.target.style.borderColor = COLORS.sky;
        e.target.style.boxShadow = `0 0 0 3px ${COLORS.sky}20`;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = COLORS.lightGray;
        e.target.style.boxShadow = 'none';
      }}
    />
  );
}

// Select component
function SelectInput({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '12px 16px',
        fontSize: '15px',
        border: `1px solid ${COLORS.lightGray}`,
        borderRadius: '8px',
        outline: 'none',
        background: COLORS.white,
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234A5568' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 16px center'
      }}
    >
      <option value="">{placeholder || 'Select...'}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

// Checkbox component
function Checkbox({ checked, onChange, label }) {
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      fontSize: '15px',
      color: COLORS.navy
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{
          width: '20px',
          height: '20px',
          accentColor: COLORS.lime,
          cursor: 'pointer'
        }}
      />
      {label}
    </label>
  );
}

// Radio group component
function RadioGroup({ value, onChange, options, name }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {options.map(opt => (
        <label key={opt.value} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          fontSize: '15px',
          color: COLORS.navy
        }}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: '20px',
              height: '20px',
              accentColor: COLORS.lime,
              cursor: 'pointer'
            }}
          />
          <span>
            <strong>{opt.label}</strong>
            {opt.description && (
              <span style={{ color: COLORS.darkGray, fontWeight: 'normal' }}> — {opt.description}</span>
            )}
          </span>
        </label>
      ))}
    </div>
  );
}

// File upload component
function FileUpload({ file, onFileSelect, accept }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) onFileSelect(droppedFile);
  }, [onFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        border: `2px dashed ${dragOver ? COLORS.lime : COLORS.lightGray}`,
        borderRadius: '12px',
        padding: '32px',
        textAlign: 'center',
        background: dragOver ? `${COLORS.lime}10` : COLORS.gray,
        transition: 'all 0.2s',
        cursor: 'pointer'
      }}
      onClick={() => document.getElementById('file-input').click()}
    >
      <input
        id="file-input"
        type="file"
        accept={accept}
        onChange={(e) => {
          if (e.target.files[0]) onFileSelect(e.target.files[0]);
        }}
        style={{ display: 'none' }}
      />

      {file ? (
        <div>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📄</div>
          <p style={{ margin: '0 0 4px', fontWeight: '600', color: COLORS.navy }}>{file.name}</p>
          <p style={{ margin: 0, fontSize: '13px', color: COLORS.darkGray }}>
            {(file.size / 1024).toFixed(1)} KB
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFileSelect(null);
            }}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              fontSize: '13px',
              background: 'transparent',
              border: `1px solid ${COLORS.red}`,
              color: COLORS.red,
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Remove file
          </button>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.5 }}>📁</div>
          <p style={{ margin: '0 0 8px', fontWeight: '500', color: COLORS.navy }}>
            Drag & drop your file here
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: COLORS.darkGray }}>
            or click to browse
          </p>
          <p style={{ margin: '12px 0 0', fontSize: '12px', color: COLORS.darkGray }}>
            Accepts CSV, XLS, XLSX (max 10MB)
          </p>
        </div>
      )}
    </div>
  );
}

// Grid layout helper
function FormGrid({ children, columns = 2 }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '16px'
    }}>
      {children}
    </div>
  );
}

// Main App Component
export default function EmployerIntakePortal() {
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    legalName: '',
    entityType: '',
    ein: '',
    addressStreet: '',
    addressCity: '',
    addressState: '',
    addressZip: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactTitle: '',
    isSchoolDistrict: false,
    isTrsDistrict: false,
    paysThroughEsc: false,
    payFrequency: '',
    payrollProvider: '',
    nextPayDate: '',
    employeeCountTotal: '',
    employeeCountFulltime: '',
    employeeCountParttime: '',
    currentHealthCarrier: '',
    hasSection125: false,
    hasUnionEmployees: false,
    fiscalYearEnd: '',
    monthlyUpdatePreference: 'Self-Service',
    specialCircumstances: '',
    signatureName: '',
    agreeToTerms: false
  });

  const [censusFile, setCensusFile] = useState(null);
  const [step, setStep] = useState('form');
  const [errors, setErrors] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.entityType) newErrors.entityType = 'Entity type is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    if (!formData.payFrequency) newErrors.payFrequency = 'Pay frequency is required';
    if (!formData.employeeCountFulltime) newErrors.employeeCountFulltime = 'Full-time employee count is required';
    if (!formData.signatureName.trim()) newErrors.signatureName = 'Signature is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setStep('submitting');

    try {
      const enrollmentCode = generateCode(formData.companyName);
      const intakeCode = `INTAKE-${enrollmentCode}`;

      const orgData = {
        code: enrollmentCode,
        intake_code: intakeCode,
        name: formData.companyName,
        legal_name: formData.legalName || formData.companyName,
        entity_type: formData.entityType,
        ein: formData.ein || null,
        address_street: formData.addressStreet || null,
        address_city: formData.addressCity || null,
        address_state: formData.addressState || null,
        address_zip: formData.addressZip || null,
        primary_contact_name: formData.contactName,
        primary_contact_email: formData.contactEmail,
        primary_contact_phone: formData.contactPhone || null,
        primary_contact_title: formData.contactTitle || null,
        is_school_district: formData.isSchoolDistrict || formData.entityType === 'School District',
        is_trs_district: formData.isTrsDistrict,
        pays_through_esc: formData.paysThroughEsc,
        pay_frequency: formData.payFrequency,
        payroll_provider: formData.payrollProvider || null,
        next_pay_date: formData.nextPayDate || null,
        employee_count_total: parseInt(formData.employeeCountTotal) || null,
        employee_count_fulltime: parseInt(formData.employeeCountFulltime) || null,
        employee_count_parttime: parseInt(formData.employeeCountParttime) || null,
        current_health_carrier: formData.currentHealthCarrier || null,
        has_section_125_plan: formData.hasSection125,
        has_union_employees: formData.hasUnionEmployees,
        fiscal_year_end: formData.fiscalYearEnd || null,
        monthly_update_preference: formData.monthlyUpdatePreference,
        special_circumstances: formData.specialCircumstances || null,
        intake_signature_name: formData.signatureName,
        intake_signature_date: new Date().toISOString().split('T')[0],
        pipeline_stage: 'Intake Received',
        intake_submitted_at: new Date().toISOString()
      };

      const response = await fetch(`${SUPABASE_URL}/rest/v1/organizations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(orgData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit intake form');
      }

      const result = await response.json();

      setSubmissionResult({
        organizationId: result[0]?.id,
        enrollmentCode,
        intakeCode
      });
      setStep('success');

    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: error.message });
      setStep('error');
    }
  };

  // Success screen
  if (step === 'success') {
    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #2d5a8a 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          background: COLORS.white,
          borderRadius: '24px',
          padding: '48px',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${COLORS.lime}, ${COLORS.sky})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '40px',
            color: COLORS.white
          }}>
            ✓
          </div>

          <h1 style={{ color: COLORS.navy, margin: '0 0 16px', fontSize: '28px' }}>
            Intake Submitted Successfully!
          </h1>

          <p style={{ color: COLORS.darkGray, margin: '0 0 32px', fontSize: '16px', lineHeight: '1.6' }}>
            Thank you for submitting your information. Our team will review your submission and contact you within 1-2 business days.
          </p>

          <div style={{
            background: COLORS.gray,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '14px', color: COLORS.darkGray }}>
              Your enrollment code:
            </p>
            <p style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '700',
              color: COLORS.navy,
              fontFamily: 'monospace',
              letterSpacing: '2px'
            }}>
              {submissionResult?.enrollmentCode}
            </p>
          </div>

          <div style={{
            background: `${COLORS.sky}15`,
            border: `1px solid ${COLORS.sky}30`,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '32px'
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: COLORS.navy, lineHeight: '1.5' }}>
              <strong>What's next?</strong><br />
              We'll run an eligibility analysis and send you a detailed report showing exactly how much your employees can save.
            </p>
          </div>

          <p style={{ margin: 0, fontSize: '14px', color: COLORS.darkGray }}>
            Questions? Contact us at<br />
            <a href="tel:8067991099" style={{ color: COLORS.sky }}>(806) 799-1099</a>
            {' '} or {' '}
            <a href="mailto:info@livewellhsa.com" style={{ color: COLORS.sky }}>info@livewellhsa.com</a>
          </p>
        </div>
      </div>
    );
  }

  // Error screen
  if (step === 'error') {
    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #2d5a8a 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          background: COLORS.white,
          borderRadius: '24px',
          padding: '48px',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: `${COLORS.red}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '40px'
          }}>
            ⚠️
          </div>

          <h1 style={{ color: COLORS.navy, margin: '0 0 16px', fontSize: '28px' }}>
            Submission Error
          </h1>

          <p style={{ color: COLORS.darkGray, margin: '0 0 24px', fontSize: '16px', lineHeight: '1.6' }}>
            {errors.submit || 'There was a problem submitting your form. Please try again.'}
          </p>

          <button
            onClick={() => {
              setStep('form');
              setErrors({});
            }}
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              background: COLORS.navy,
              color: COLORS.white,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Submitting screen
  if (step === 'submitting') {
    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #2d5a8a 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          background: COLORS.white,
          borderRadius: '24px',
          padding: '48px',
          maxWidth: '400px',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: `4px solid ${COLORS.lightGray}`,
            borderTopColor: COLORS.lime,
            borderRadius: '50%',
            margin: '0 auto 24px',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

          <h2 style={{ color: COLORS.navy, margin: '0 0 8px', fontSize: '20px' }}>
            Submitting...
          </h2>
          <p style={{ color: COLORS.darkGray, margin: 0, fontSize: '14px' }}>
            Please wait while we process your information.
          </p>
        </div>
      </div>
    );
  }

  const isSchoolDistrict = formData.entityType === 'School District' || formData.isSchoolDistrict;

  // Main form
  return (
    <div style={{ minHeight: '100vh', background: COLORS.gray }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #2d5a8a 100%)`,
        padding: '40px 20px 60px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: COLORS.lime,
            marginBottom: '8px'
          }}>
            LIVE<span style={{ color: COLORS.sky }}>WELL</span><span style={{ color: COLORS.lime }}>360</span>
          </div>
          <h1 style={{ color: COLORS.white, margin: '0 0 12px', fontSize: '32px', fontWeight: '700' }}>
            Employer Intake Form
          </h1>
          <p style={{ color: COLORS.sky, margin: 0, fontSize: '18px', opacity: 0.9 }}>
            Let's get started with your wellness benefit program
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div style={{ maxWidth: '720px', margin: '-40px auto 40px', padding: '0 20px' }}>

        {/* Section 1: Company Information */}
        <FormSection number="1" title="Company Information" description="Tell us about your organization">
          <FormGrid>
            <FormField label="Company Name" required error={errors.companyName}>
              <TextInput
                value={formData.companyName}
                onChange={(v) => updateField('companyName', v)}
                placeholder="e.g., Acme Corporation"
              />
            </FormField>
            <FormField label="Legal Entity Name" hint="If different from company name">
              <TextInput
                value={formData.legalName}
                onChange={(v) => updateField('legalName', v)}
                placeholder="e.g., Acme Corp, LLC"
              />
            </FormField>
          </FormGrid>

          <FormGrid>
            <FormField label="Entity Type" required error={errors.entityType}>
              <SelectInput
                value={formData.entityType}
                onChange={(v) => {
                  updateField('entityType', v);
                  if (v === 'School District') {
                    updateField('isSchoolDistrict', true);
                  } else {
                    updateField('isSchoolDistrict', false);
                  }
                }}
                options={ENTITY_TYPES}
                placeholder="Select entity type..."
              />
            </FormField>
            <FormField label="EIN" hint="Employer Identification Number">
              <TextInput
                value={formData.ein}
                onChange={(v) => updateField('ein', v)}
                placeholder="XX-XXXXXXX"
              />
            </FormField>
          </FormGrid>

          <FormField label="Street Address">
            <TextInput
              value={formData.addressStreet}
              onChange={(v) => updateField('addressStreet', v)}
              placeholder="123 Main Street"
            />
          </FormField>

          <FormGrid columns={3}>
            <FormField label="City">
              <TextInput
                value={formData.addressCity}
                onChange={(v) => updateField('addressCity', v)}
                placeholder="City"
              />
            </FormField>
            <FormField label="State">
              <TextInput
                value={formData.addressState}
                onChange={(v) => updateField('addressState', v)}
                placeholder="TX"
              />
            </FormField>
            <FormField label="ZIP Code">
              <TextInput
                value={formData.addressZip}
                onChange={(v) => updateField('addressZip', v)}
                placeholder="79401"
              />
            </FormField>
          </FormGrid>
        </FormSection>

        {/* Section 2: Primary Contact */}
        <FormSection number="2" title="Primary Contact" description="Who should we contact about this enrollment?">
          <FormGrid>
            <FormField label="Full Name" required error={errors.contactName}>
              <TextInput
                value={formData.contactName}
                onChange={(v) => updateField('contactName', v)}
                placeholder="Jane Smith"
              />
            </FormField>
            <FormField label="Title">
              <TextInput
                value={formData.contactTitle}
                onChange={(v) => updateField('contactTitle', v)}
                placeholder="HR Director"
              />
            </FormField>
          </FormGrid>

          <FormGrid>
            <FormField label="Email Address" required error={errors.contactEmail}>
              <TextInput
                type="email"
                value={formData.contactEmail}
                onChange={(v) => updateField('contactEmail', v)}
                placeholder="jane@company.com"
              />
            </FormField>
            <FormField label="Phone Number">
              <TextInput
                type="tel"
                value={formData.contactPhone}
                onChange={(v) => updateField('contactPhone', v)}
                placeholder="(555) 123-4567"
              />
            </FormField>
          </FormGrid>
        </FormSection>

        {/* Section 3: School District Details (conditional) */}
        {isSchoolDistrict && (
          <FormSection number="3" title="School District Details" description="Additional information for school districts">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Checkbox
                checked={formData.isTrsDistrict}
                onChange={(v) => updateField('isTrsDistrict', v)}
                label="This district participates in TRS (Texas Teacher Retirement System)"
              />
              <Checkbox
                checked={formData.paysThroughEsc}
                onChange={(v) => updateField('paysThroughEsc', v)}
                label="Payroll is processed through an Education Service Center (ESC)"
              />
            </div>

            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: `${COLORS.sky}10`,
              borderRadius: '8px',
              border: `1px solid ${COLORS.sky}30`
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: COLORS.navy }}>
                <strong>Note:</strong> TRS districts do not pay Social Security. Employees in these districts
                qualify based on Medicare and FIT savings only.
              </p>
            </div>
          </FormSection>
        )}

        {/* Section 4: Payroll Information */}
        <FormSection
          number={isSchoolDistrict ? '4' : '3'}
          title="Payroll Information"
          description="Help us understand your payroll setup"
        >
          <FormGrid>
            <FormField label="Pay Frequency" required error={errors.payFrequency}>
              <SelectInput
                value={formData.payFrequency}
                onChange={(v) => updateField('payFrequency', v)}
                options={PAY_FREQUENCIES}
                placeholder="Select frequency..."
              />
            </FormField>
            <FormField label="Payroll Provider">
              <SelectInput
                value={formData.payrollProvider}
                onChange={(v) => updateField('payrollProvider', v)}
                options={PAYROLL_PROVIDERS}
                placeholder="Select provider..."
              />
            </FormField>
          </FormGrid>

          <FormGrid>
            <FormField label="Next Pay Date">
              <TextInput
                type="date"
                value={formData.nextPayDate}
                onChange={(v) => updateField('nextPayDate', v)}
              />
            </FormField>
            <div></div>
          </FormGrid>

          <div style={{
            marginTop: '8px',
            padding: '20px',
            background: COLORS.gray,
            borderRadius: '12px'
          }}>
            <p style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '600', color: COLORS.navy }}>
              Employee Counts
            </p>
            <FormGrid columns={3}>
              <FormField label="Full-Time" required error={errors.employeeCountFulltime}>
                <TextInput
                  type="number"
                  value={formData.employeeCountFulltime}
                  onChange={(v) => updateField('employeeCountFulltime', v)}
                  placeholder="0"
                />
              </FormField>
              <FormField label="Part-Time">
                <TextInput
                  type="number"
                  value={formData.employeeCountParttime}
                  onChange={(v) => updateField('employeeCountParttime', v)}
                  placeholder="0"
                />
              </FormField>
              <FormField label="Total">
                <TextInput
                  type="number"
                  value={
                    formData.employeeCountTotal ||
                    String(
                      (parseInt(formData.employeeCountFulltime) || 0) +
                      (parseInt(formData.employeeCountParttime) || 0)
                    )
                  }
                  onChange={(v) => updateField('employeeCountTotal', v)}
                  placeholder="0"
                />
              </FormField>
            </FormGrid>
          </div>
        </FormSection>

        {/* Section 5: Current Benefits */}
        <FormSection
          number={isSchoolDistrict ? '5' : '4'}
          title="Current Benefits"
          description="Tell us about your existing benefit setup"
        >
          <FormField label="Current Health Insurance Carrier" hint="If applicable">
            <TextInput
              value={formData.currentHealthCarrier}
              onChange={(v) => updateField('currentHealthCarrier', v)}
              placeholder="e.g., Blue Cross Blue Shield, United Healthcare"
            />
          </FormField>

          <FormGrid>
            <FormField label="Fiscal Year End" hint="e.g., December 31">
              <TextInput
                value={formData.fiscalYearEnd}
                onChange={(v) => updateField('fiscalYearEnd', v)}
                placeholder="December 31"
              />
            </FormField>
            <div></div>
          </FormGrid>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            <Checkbox
              checked={formData.hasSection125}
              onChange={(v) => updateField('hasSection125', v)}
              label="We currently have a Section 125 (Cafeteria) Plan in place"
            />
            <Checkbox
              checked={formData.hasUnionEmployees}
              onChange={(v) => updateField('hasUnionEmployees', v)}
              label="We have employees covered under a union or collective bargaining agreement"
            />
          </div>
        </FormSection>

        {/* Section 6: Census Upload */}
        <FormSection
          number={isSchoolDistrict ? '6' : '5'}
          title="Employee Census"
          description="Upload your employee data for eligibility analysis"
        >
          <FileUpload
            file={censusFile}
            onFileSelect={setCensusFile}
            accept=".csv,.xls,.xlsx"
          />

          <div style={{
            marginTop: '20px',
            padding: '16px',
            background: COLORS.gray,
            borderRadius: '8px'
          }}>
            <p style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '600', color: COLORS.navy }}>
              What to include in your census:
            </p>
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '14px',
              color: COLORS.darkGray,
              lineHeight: '1.8'
            }}>
              <li>Employee name (first and last)</li>
              <li>Email address</li>
              <li>Annual salary or hourly rate</li>
              <li>Pay type (salary or hourly)</li>
              <li>Filing status (Single, MFJ, etc.)</li>
              <li>Employment type (Full-time, Part-time)</li>
            </ul>
            <p style={{ margin: '16px 0 0', fontSize: '13px', color: COLORS.darkGray }}>
              Don't have a census ready? No problem — you can email it to us later at{' '}
              <a href="mailto:info@livewellhsa.com" style={{ color: COLORS.sky }}>
                info@livewellhsa.com
              </a>
            </p>
          </div>
        </FormSection>

        {/* Section 7: Monthly Updates Preference */}
        <FormSection
          number={isSchoolDistrict ? '7' : '6'}
          title="Monthly Updates"
          description="How would you like to handle new hires and terminations?"
        >
          <RadioGroup
            name="monthlyUpdate"
            value={formData.monthlyUpdatePreference}
            onChange={(v) => updateField('monthlyUpdatePreference', v)}
            options={[
              {
                value: 'Self-Service',
                label: 'Self-Service',
                description: 'Upload new hires and terminations directly in the employer portal'
              },
              {
                value: 'Email to LW360',
                label: 'Email to LW360',
                description: "Send lists to our team and we'll process them for you"
              },
              {
                value: 'Automated Feed',
                label: 'Automated Feed',
                description: 'Connect your payroll system for automatic updates'
              }
            ]}
          />
        </FormSection>

        {/* Section 8: Additional Information + E-Signature */}
        <FormSection
          number={isSchoolDistrict ? '8' : '7'}
          title="Additional Information"
          description="Anything else we should know?"
        >
          <FormField label="Special Circumstances or Notes" hint="Optional">
            <textarea
              value={formData.specialCircumstances}
              onChange={(e) => updateField('specialCircumstances', e.target.value)}
              placeholder="Any special circumstances, questions, or additional information you'd like to share..."
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: `1px solid ${COLORS.lightGray}`,
                borderRadius: '8px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </FormField>
        </FormSection>

        {/* E-Signature Section */}
        <FormSection
          number={isSchoolDistrict ? '9' : '8'}
          title="Acknowledgment & E-Signature"
          description="Please review and sign to complete your submission"
        >
          <div style={{
            padding: '20px',
            background: COLORS.gray,
            borderRadius: '12px',
            marginBottom: '24px'
          }}>
            <p style={{ margin: '0 0 16px', fontSize: '14px', color: COLORS.navy, lineHeight: '1.6' }}>
              By signing below, I acknowledge that:
            </p>
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '14px',
              color: COLORS.darkGray,
              lineHeight: '1.8'
            }}>
              <li>The information provided is accurate to the best of my knowledge</li>
              <li>I am authorized to submit this information on behalf of my organization</li>
              <li>I authorize Live Well 360 to run an eligibility analysis based on the provided data</li>
              <li>I understand that enrollment is voluntary and employees may opt out at any time</li>
              <li>I consent to be contacted by Live Well 360 regarding this submission</li>
            </ul>
          </div>

          <FormField label="Electronic Signature" required error={errors.signatureName}>
            <TextInput
              value={formData.signatureName}
              onChange={(v) => updateField('signatureName', v)}
              placeholder="Type your full name as your electronic signature"
            />
          </FormField>

          <div style={{ marginBottom: '8px' }}>
            <Checkbox
              checked={formData.agreeToTerms}
              onChange={(v) => updateField('agreeToTerms', v)}
              label={
                <span>
                  I agree to the{' '}
                  <a href="https://www.livewellhealth360.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.sky }}>
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="https://www.livewellhealth360.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.sky }}>
                    Privacy Policy
                  </a>
                </span>
              }
            />
            {errors.agreeToTerms && (
              <p style={{ margin: '6px 0 0', fontSize: '12px', color: COLORS.red }}>{errors.agreeToTerms}</p>
            )}
          </div>

          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: `${COLORS.lime}10`,
            border: `1px solid ${COLORS.lime}30`,
            borderRadius: '8px'
          }}>
            <p style={{ margin: 0, fontSize: '13px', color: COLORS.darkGray }}>
              <strong style={{ color: COLORS.navy }}>Date:</strong>{' '}
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </FormSection>

        {/* Submit Button */}
        <div style={{ textAlign: 'center', padding: '20px 0 40px' }}>
          {Object.keys(errors).length > 0 && errors.submit === undefined && (
            <div style={{
              marginBottom: '20px',
              padding: '12px 20px',
              background: `${COLORS.red}10`,
              border: `1px solid ${COLORS.red}30`,
              borderRadius: '8px',
              fontSize: '14px',
              color: COLORS.red
            }}>
              Please fix the errors above before submitting.
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={{
              padding: '16px 48px',
              fontSize: '18px',
              fontWeight: '600',
              background: `linear-gradient(135deg, ${COLORS.lime}, #5fa832)`,
              color: COLORS.white,
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(122, 193, 67, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(122, 193, 67, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(122, 193, 67, 0.4)';
            }}
          >
            Submit Intake Form
          </button>

          <p style={{ margin: '20px 0 0', fontSize: '14px', color: COLORS.darkGray }}>
            Questions? Call us at{' '}
            <a href="tel:8067991099" style={{ color: COLORS.sky, textDecoration: 'none' }}>
              (806) 799-1099
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: COLORS.navy,
        padding: '24px 20px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '13px', color: COLORS.sky, opacity: 0.8 }}>
          © {new Date().getFullYear()} Live Well 360 Health Strategy Advisors | 6609 Toledo Avenue Ste. 1, Lubbock, TX
        </p>
      </div>
    </div>
  );
}
