import React, { useState, useCallback, useRef, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// LW360 EMPLOYER INTAKE PORTAL - COMPLETE VERSION
// All 8 sections: Company Info, Contact, School District, Payroll, Benefits,
// Census Upload, Monthly Updates, E-Signature
// ═══════════════════════════════════════════════════════════════════════════════

// Supabase Configuration
const SUPABASE_URL = 'https://aejnfgtttbenrnlmrsam.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlam5mZ3R0dGJlbnJubG1yc2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2Mzk5NTMsImV4cCI6MjA5MDIxNTk1M30.8fLf1gmgdtF3J0JaLX_LC73Jk15N451zAfiM6NuDXdU';

// Brand Colors
const COLORS = {
  navy: '#1A395C',
  lime: '#7AC143',
  sky: '#29ABE2',
  white: '#FFFFFF',
  gray: '#F8FAFC',
  grayMedium: '#E2E8F0',
  grayDark: '#64748B',
  red: '#EF4444',
  redLight: '#FEF2F2',
};

// LW360 Stacked Logo (base64 encoded)
const LW360_LOGO = 'data:image/png;base64,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';

// Entity Types
const ENTITY_TYPES = [
  { value: '', label: 'Select entity type...' },
  { value: 'LLC', label: 'LLC' },
  { value: 'S-Corp', label: 'S-Corporation' },
  { value: 'C-Corp', label: 'C-Corporation' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'Sole Proprietorship', label: 'Sole Proprietorship' },
  { value: 'Non-Profit', label: 'Non-Profit' },
  { value: 'Government', label: 'Government Entity' },
  { value: 'School District', label: 'School District' },
];

// Pay Frequencies
const PAY_FREQUENCIES = [
  { value: '', label: 'Select frequency...' },
  { value: 'Weekly', label: 'Weekly (52 pay periods)' },
  { value: 'Biweekly', label: 'Biweekly (26 pay periods)' },
  { value: 'Semi-Monthly', label: 'Semi-Monthly (24 pay periods)' },
  { value: 'Monthly', label: 'Monthly (12 pay periods)' },
];

// Payroll Providers
const PAYROLL_PROVIDERS = [
  { value: '', label: 'Select provider...' },
  { value: 'ADP', label: 'ADP' },
  { value: 'Paychex', label: 'Paychex' },
  { value: 'Gusto', label: 'Gusto' },
  { value: 'QuickBooks', label: 'QuickBooks Payroll' },
  { value: 'Paylocity', label: 'Paylocity' },
  { value: 'Paycom', label: 'Paycom' },
  { value: 'Ascender', label: 'Ascender' },
  { value: 'In-House', label: 'In-House / Manual' },
  { value: 'Other', label: 'Other' },
];

// US States for dropdown
const US_STATES = [
  { value: '', label: 'Select state...' },
  { value: 'TX', label: 'Texas' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// Form Section Container
function FormSection({ number, title, description, children, isConditional = false }) {
  return (
    <div style={{
      background: COLORS.white,
      borderRadius: '16px',
      padding: '28px',
      marginBottom: '20px',
      border: `1px solid ${COLORS.grayMedium}`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      ...(isConditional && {
        borderLeft: `4px solid ${COLORS.sky}`,
        background: '#F0F9FF',
      }),
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '24px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${COLORS.lime}, ${COLORS.sky})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: COLORS.white,
          fontWeight: '700',
          fontSize: '14px',
          flexShrink: 0,
        }}>
          {number}
        </div>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '600', color: COLORS.navy }}>{title}</h2>
          {description && <p style={{ margin: 0, fontSize: '14px', color: COLORS.grayDark }}>{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

// Form Grid
function FormGrid({ children, columns = 2, className }) {
  const defaultClass = columns === 3 ? 'form-grid-3' : 'form-grid-2';
  return (
    <div
      className={className || defaultClass}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '16px',
        marginBottom: '16px',
      }}
    >
      {children}
    </div>
  );
}

// Form Field Container
function FormField({ label, required, children, error, hint, fullWidth = false }) {
  return (
    <div style={{ gridColumn: fullWidth ? '1 / -1' : 'auto' }}>
      <label style={{
        display: 'block',
        marginBottom: '6px',
        fontSize: '14px',
        fontWeight: '500',
        color: COLORS.navy,
      }}>
        {label}
        {required && <span style={{ color: COLORS.red, marginLeft: '4px' }}>*</span>}
      </label>
      {children}
      {hint && <p style={{ margin: '4px 0 0', fontSize: '12px', color: COLORS.grayDark }}>{hint}</p>}
      {error && <p style={{ margin: '4px 0 0', fontSize: '12px', color: COLORS.red }}>{error}</p>}
    </div>
  );
}

// Text Input
function TextInput({ type = 'text', value, onChange, placeholder, error, disabled = false }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '12px 14px',
        fontSize: '15px',
        border: `1px solid ${error ? COLORS.red : COLORS.grayMedium}`,
        borderRadius: '10px',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        background: disabled ? COLORS.gray : COLORS.white,
        color: COLORS.navy,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = COLORS.lime;
        e.target.style.boxShadow = `0 0 0 3px ${COLORS.lime}20`;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = error ? COLORS.red : COLORS.grayMedium;
        e.target.style.boxShadow = 'none';
      }}
    />
  );
}

// Select Input
function SelectInput({ value, onChange, options, error }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '12px 14px',
        fontSize: '15px',
        border: `1px solid ${error ? COLORS.red : COLORS.grayMedium}`,
        borderRadius: '10px',
        outline: 'none',
        background: COLORS.white,
        color: value ? COLORS.navy : COLORS.grayDark,
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748B' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

// Textarea
function TextArea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        padding: '12px 14px',
        fontSize: '15px',
        border: `1px solid ${COLORS.grayMedium}`,
        borderRadius: '10px',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'inherit',
        color: COLORS.navy,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = COLORS.lime;
        e.target.style.boxShadow = `0 0 0 3px ${COLORS.lime}20`;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = COLORS.grayMedium;
        e.target.style.boxShadow = 'none';
      }}
    />
  );
}

// Radio Group
function RadioGroup({ name, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {options.map((opt) => (
        <label key={opt.value} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: '15px',
          color: COLORS.navy,
        }}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: '18px',
              height: '18px',
              accentColor: COLORS.lime,
            }}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

// Checkbox
function Checkbox({ checked, onChange, label }) {
  return (
    <label style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      cursor: 'pointer',
      fontSize: '14px',
      color: COLORS.navy,
      lineHeight: '1.5',
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{
          width: '18px',
          height: '18px',
          accentColor: COLORS.lime,
          marginTop: '2px',
          flexShrink: 0,
        }}
      />
      <span>{label}</span>
    </label>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FILE UPLOAD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function FileUpload({ file, onFileSelect, onFileRemove, accept = '.csv,.xls,.xlsx', maxSizeMB = 10 }) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState('');

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const validateAndSetFile = (selectedFile) => {
    const maxSize = maxSizeMB * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setFileError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }
    const ext = selectedFile.name.split('.').pop().toLowerCase();
    const allowedExts = accept.split(',').map(a => a.replace('.', '').trim());
    if (!allowedExts.includes(ext)) {
      setFileError(`Please upload a ${accept} file`);
      return;
    }
    setFileError('');
    onFileSelect(selectedFile);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  if (file) {
    return (
      <div style={{
        border: `2px solid ${COLORS.lime}`,
        borderRadius: '12px',
        padding: '16px 20px',
        background: `${COLORS.lime}10`,
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: COLORS.lime,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: COLORS.white,
          fontSize: '20px',
        }}>
          📄
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: COLORS.navy }}>{file.name}</p>
          <p style={{ margin: '2px 0 0', fontSize: '13px', color: COLORS.grayDark }}>{formatFileSize(file.size)}</p>
        </div>
        <button
          onClick={onFileRemove}
          style={{
            padding: '8px 14px',
            fontSize: '13px',
            fontWeight: '500',
            color: COLORS.red,
            background: COLORS.white,
            border: `1px solid ${COLORS.red}`,
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? COLORS.lime : COLORS.grayMedium}`,
          borderRadius: '12px',
          padding: '40px 20px',
          textAlign: 'center',
          background: dragOver ? `${COLORS.lime}10` : COLORS.gray,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => {
            if (e.target.files[0]) {
              validateAndSetFile(e.target.files[0]);
            }
          }}
          style={{ display: 'none' }}
        />
        <div style={{ fontSize: '36px', marginBottom: '12px', opacity: 0.6 }}>📁</div>
        <p style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: '600', color: COLORS.navy }}>
          Drag & drop your file here
        </p>
        <p style={{ margin: 0, fontSize: '13px', color: COLORS.grayDark }}>
          or click to browse • CSV, XLS, XLSX (max {maxSizeMB}MB)
        </p>
      </div>
      {fileError && (
        <p style={{ margin: '8px 0 0', fontSize: '13px', color: COLORS.red }}>{fileError}</p>
      )}
    </React.Fragment>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN INTAKE FORM
// ═══════════════════════════════════════════════════════════════════════════════

function IntakeForm() {
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    legalName: '',
    entityType: '',
    ein: '',
    addressStreet: '',
    addressCity: '',
    addressState: '',
    addressZip: '',
    
    // Primary Contact
    contactName: '',
    contactTitle: '',
    contactEmail: '',
    contactPhone: '',
    
    // School District (conditional)
    isTRS: '',
    paysViaESC: '',
    escName: '',
    
    // Payroll Information
    payFrequency: '',
    payrollProvider: '',
    payrollProviderOther: '',
    nextPayDate: '',
    employeeCountFulltime: '',
    employeeCountParttime: '',
    employeeCountTotal: '',
    
    // Current Benefits
    healthInsuranceCarrier: '',
    hasSection125: '',
    hasUnionEmployees: '',
    fiscalYearEnd: '',
    
    // Census Upload
    censusFile: null,
    
    // Monthly Updates
    updatePreference: '',
    
    // Additional Notes
    specialCircumstances: '',
    
    // Signature
    signatureName: '',
    signatureTitle: '',
    signatureDate: '',
    agreedToTerms: false,
    agreedToAnalysis: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [enrollmentCode, setEnrollmentCode] = useState('');
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (!formTouched) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [formTouched]);

  const updateField = (field, value) => {
    if (!formTouched) setFormTouched(true);
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const isSchoolDistrict = formData.entityType === 'School District';

  const downloadCensusTemplate = () => {
    const headers = 'First Name,Last Name,Email,Employee ID,Pay Type,Annual Salary,Hourly Rate,Hours Per Week,Pay Frequency,Filing Status,Employment Type,Job Title,Department';
    const blob = new Blob([headers + '\n'], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lw360_census_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.entityType) newErrors.entityType = 'Entity type is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email';
    }
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Phone is required';
    if (!formData.payFrequency) newErrors.payFrequency = 'Pay frequency is required';
    if (!formData.employeeCountFulltime) newErrors.employeeCountFulltime = 'Full-time count is required';
    if (!formData.censusFile) newErrors.censusFile = 'Census file is required';
    if (!formData.signatureName.trim()) newErrors.signatureName = 'Signature is required';
    if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to the terms';
    if (!formData.agreedToAnalysis) newErrors.agreedToAnalysis = 'You must authorize the analysis';

    // School district specific
    if (isSchoolDistrict) {
      if (!formData.isTRS) newErrors.isTRS = 'Please indicate TRS participation';
      if (!formData.paysViaESC) newErrors.paysViaESC = 'Please indicate ESC payroll status';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadCensusFile = async (file, orgId) => {
    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${orgId}/census_${Date.now()}.${fileExt}`;
    
    const response = await fetch(`${SUPABASE_URL}/storage/v1/object/census-files/${fileName}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error('Failed to upload census file');
    }

    return fileName;
  };

  const handleSubmit = async () => {
    const validationResult = (() => {
      const errs = {};
      if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
      if (!formData.entityType) errs.entityType = 'Entity type is required';
      if (!formData.contactName.trim()) errs.contactName = 'Contact name is required';
      if (!formData.contactEmail.trim()) errs.contactEmail = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
        errs.contactEmail = 'Please enter a valid email';
      }
      if (!formData.contactPhone.trim()) errs.contactPhone = 'Phone is required';
      if (!formData.payFrequency) errs.payFrequency = 'Pay frequency is required';
      if (!formData.employeeCountFulltime) errs.employeeCountFulltime = 'Full-time count is required';
      if (!formData.censusFile) errs.censusFile = 'Census file is required';
      if (!formData.signatureName.trim()) errs.signatureName = 'Signature is required';
      if (!formData.agreedToTerms) errs.agreedToTerms = 'You must agree to the terms';
      if (!formData.agreedToAnalysis) errs.agreedToAnalysis = 'You must authorize the analysis';
      if (isSchoolDistrict) {
        if (!formData.isTRS) errs.isTRS = 'Please indicate TRS participation';
        if (!formData.paysViaESC) errs.paysViaESC = 'Please indicate ESC payroll status';
      }
      return errs;
    })();

    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult);
      const firstErrorKey = Object.keys(validationResult)[0];
      document.querySelector(`[data-field="${firstErrorKey}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate total employees
      const totalEmployees = parseInt(formData.employeeCountFulltime || 0) + parseInt(formData.employeeCountParttime || 0);

      // Prepare organization data — intake_code is generated server-side by DB trigger
      const orgData = {
        name: formData.companyName,
        legal_name: formData.legalName || formData.companyName,
        entity_type: formData.entityType,
        ein: formData.ein,
        address_street: formData.addressStreet,
        address_city: formData.addressCity,
        address_state: formData.addressState,
        address_zip: formData.addressZip,
        contact_name: formData.contactName,
        contact_title: formData.contactTitle,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        is_trs: isSchoolDistrict ? formData.isTRS === 'yes' : null,
        pays_via_esc: isSchoolDistrict ? formData.paysViaESC === 'yes' : null,
        esc_name: isSchoolDistrict && formData.paysViaESC === 'yes' ? formData.escName : null,
        pay_frequency: formData.payFrequency,
        payroll_provider: formData.payrollProvider === 'Other' ? formData.payrollProviderOther : formData.payrollProvider,
        next_pay_date: formData.nextPayDate || null,
        employee_count_fulltime: parseInt(formData.employeeCountFulltime) || 0,
        employee_count_parttime: parseInt(formData.employeeCountParttime) || 0,
        employee_count_total: totalEmployees,
        health_insurance_carrier: formData.healthInsuranceCarrier,
        has_section_125: formData.hasSection125 === 'yes',
        has_union_employees: formData.hasUnionEmployees === 'yes',
        fiscal_year_end: formData.fiscalYearEnd,
        update_preference: formData.updatePreference,
        special_circumstances: formData.specialCircumstances,
        pipeline_stage: 'Intake Received',
        intake_submitted_at: new Date().toISOString(),
        signature_name: formData.signatureName,
        signature_title: formData.signatureTitle,
        signature_date: formData.signatureDate || new Date().toISOString().split('T')[0],
      };

      // Insert organization
      const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/organizations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(orgData),
      });

      if (!insertResponse.ok) {
        const errText = await insertResponse.text();
        throw new Error(`Failed to submit: ${errText}`);
      }

      const [newOrg] = await insertResponse.json();

      // Read the server-generated intake_code from the DB response
      const generatedCode = newOrg.intake_code || '';
      setEnrollmentCode(generatedCode);

      // Upload census file if present
      if (formData.censusFile) {
        try {
          const censusPath = await uploadCensusFile(formData.censusFile, newOrg.id);

          // Update org with census file path
          await fetch(`${SUPABASE_URL}/rest/v1/organizations?id=eq.${newOrg.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'apikey': SUPABASE_ANON_KEY,
            },
            body: JSON.stringify({ census_file_path: censusPath }),
          });
        } catch (uploadErr) {
          console.error('Census upload error:', uploadErr);
          // Continue anyway - org was created
        }
      }

      // Clear beforeunload warning on successful submit
      setFormTouched(false);
      setSubmitStatus('success');

    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Screen
  if (submitStatus === 'success') {
    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${COLORS.navy} 0%, ${COLORS.navy}F0 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}>
        <div style={{
          background: COLORS.white,
          borderRadius: '24px',
          padding: '48px',
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
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
          }}>
            ✓
          </div>
          <h1 style={{ margin: '0 0 12px', fontSize: '28px', fontWeight: '700', color: COLORS.navy }}>
            Intake Submitted!
          </h1>
          <p style={{ margin: '0 0 32px', fontSize: '16px', color: COLORS.grayDark, lineHeight: '1.6' }}>
            Thank you for submitting your information. Our team will review your data and begin the eligibility analysis shortly.
          </p>
          
          <div style={{
            background: COLORS.gray,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '32px',
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '14px', color: COLORS.grayDark }}>Your Enrollment Code</p>
            <p style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: '700',
              color: COLORS.navy,
              letterSpacing: '2px',
              fontFamily: 'monospace',
            }}>
              {enrollmentCode}
            </p>
          </div>

          <p style={{ margin: '0 0 24px', fontSize: '14px', color: COLORS.grayDark }}>
            Save this code. Your employees will use it to access their benefits portal.
          </p>

          <div style={{ fontSize: '14px', color: COLORS.grayDark }}>
            <p style={{ margin: '0 0 8px' }}>Questions? Contact us:</p>
            <p style={{ margin: 0 }}>
              <a href="tel:8067991099" style={{ color: COLORS.sky, textDecoration: 'none', fontWeight: '600' }}>
                (806) 799-1099
              </a>
              {' | '}
              <a href="mailto:info@livewellhealth360.com" style={{ color: COLORS.sky, textDecoration: 'none', fontWeight: '600' }}>
                info@livewellhealth360.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error Screen
  if (submitStatus === 'error') {
    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${COLORS.navy} 0%, ${COLORS.navy}F0 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}>
        <div style={{
          background: COLORS.white,
          borderRadius: '24px',
          padding: '48px',
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: COLORS.redLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '40px',
          }}>
            ⚠️
          </div>
          <h1 style={{ margin: '0 0 12px', fontSize: '28px', fontWeight: '700', color: COLORS.navy }}>
            Submission Error
          </h1>
          <p style={{ margin: '0 0 32px', fontSize: '16px', color: COLORS.grayDark, lineHeight: '1.6' }}>
            We encountered an issue submitting your information. Please try again or contact us for assistance.
          </p>
          
          <button
            onClick={() => setSubmitStatus(null)}
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              color: COLORS.white,
              background: COLORS.navy,
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              marginBottom: '24px',
            }}
          >
            Try Again
          </button>

          <p style={{ margin: 0, fontSize: '14px', color: COLORS.grayDark }}>
            Need help? Call{' '}
            <a href="tel:8067991099" style={{ color: COLORS.sky, textDecoration: 'none', fontWeight: '600' }}>
              (806) 799-1099
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Main Form
  return (
    <div style={{
      minHeight: '100vh',
      background: COLORS.gray,
    }}>
      {/* Header */}
      <header style={{
        background: COLORS.navy,
        padding: '20px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={LW360_LOGO} alt="Live Well 360" style={{ height: '48px' }} />
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '13px', color: COLORS.sky }}>Need help?</p>
            <a href="tel:8067991099" style={{ color: COLORS.white, textDecoration: 'none', fontSize: '15px', fontWeight: '600' }}>
              (806) 799-1099
            </a>
          </div>
        </div>
      </header>

      {/* Form Container */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px 60px' }}>
        
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ margin: '0 0 12px', fontSize: '32px', fontWeight: '700', color: COLORS.navy }}>
            Employer Intake Form
          </h1>
          <p style={{ margin: 0, fontSize: '16px', color: COLORS.grayDark, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Complete this form to begin your eligibility analysis. We'll review your information and contact you within 1-2 business days.
          </p>
        </div>

        {/* Section 1: Company Information */}
        <FormSection number="1" title="Company Information" description="Tell us about your organization">
          <FormGrid>
            <div data-field="companyName">
              <FormField label="Company Name" required error={errors.companyName}>
                <TextInput
                  value={formData.companyName}
                  onChange={(v) => updateField('companyName', v)}
                  placeholder="e.g., Acme Industries"
                  error={errors.companyName}
                />
              </FormField>
            </div>
            <FormField label="Legal Entity Name" hint="If different from company name">
              <TextInput
                value={formData.legalName}
                onChange={(v) => updateField('legalName', v)}
                placeholder="e.g., Acme Industries, LLC"
              />
            </FormField>
          </FormGrid>

          <FormGrid>
            <div data-field="entityType">
              <FormField label="Entity Type" required error={errors.entityType}>
                <SelectInput
                  value={formData.entityType}
                  onChange={(v) => updateField('entityType', v)}
                  options={ENTITY_TYPES}
                  error={errors.entityType}
                />
              </FormField>
            </div>
            <FormField label="EIN" hint="Employer Identification Number">
              <TextInput
                value={formData.ein}
                onChange={(v) => updateField('ein', v)}
                placeholder="XX-XXXXXXX"
              />
            </FormField>
          </FormGrid>

          <FormField label="Street Address" fullWidth>
            <TextInput
              value={formData.addressStreet}
              onChange={(v) => updateField('addressStreet', v)}
              placeholder="123 Main Street, Suite 100"
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
              <SelectInput
                value={formData.addressState}
                onChange={(v) => updateField('addressState', v)}
                options={US_STATES}
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
        <FormSection number="2" title="Primary Contact" description="Who should we reach out to?">
          <FormGrid>
            <div data-field="contactName">
              <FormField label="Full Name" required error={errors.contactName}>
                <TextInput
                  value={formData.contactName}
                  onChange={(v) => updateField('contactName', v)}
                  placeholder="John Smith"
                  error={errors.contactName}
                />
              </FormField>
            </div>
            <FormField label="Title">
              <TextInput
                value={formData.contactTitle}
                onChange={(v) => updateField('contactTitle', v)}
                placeholder="HR Director"
              />
            </FormField>
          </FormGrid>

          <FormGrid>
            <div data-field="contactEmail">
              <FormField label="Email" required error={errors.contactEmail}>
                <TextInput
                  type="email"
                  value={formData.contactEmail}
                  onChange={(v) => updateField('contactEmail', v)}
                  placeholder="john@company.com"
                  error={errors.contactEmail}
                />
              </FormField>
            </div>
            <div data-field="contactPhone">
              <FormField label="Phone" required error={errors.contactPhone}>
                <TextInput
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(v) => updateField('contactPhone', v)}
                  placeholder="(555) 123-4567"
                  error={errors.contactPhone}
                />
              </FormField>
            </div>
          </FormGrid>
        </FormSection>

        {/* Section 3: School District (Conditional) */}
        {isSchoolDistrict && (
          <FormSection 
            number="3" 
            title="School District Details" 
            description="Texas school district specific questions"
            isConditional
          >
            <FormGrid>
              <div data-field="isTRS">
                <FormField label="Does this district participate in TRS?" required error={errors.isTRS}>
                  <RadioGroup
                    name="isTRS"
                    value={formData.isTRS}
                    onChange={(v) => updateField('isTRS', v)}
                    options={[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ]}
                  />
                </FormField>
              </div>
              <div data-field="paysViaESC">
                <FormField label="Is payroll processed through an ESC?" required error={errors.paysViaESC}>
                  <RadioGroup
                    name="paysViaESC"
                    value={formData.paysViaESC}
                    onChange={(v) => updateField('paysViaESC', v)}
                    options={[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ]}
                  />
                </FormField>
              </div>
            </FormGrid>

            {formData.paysViaESC === 'yes' && (
              <FormField label="ESC Name">
                <TextInput
                  value={formData.escName}
                  onChange={(v) => updateField('escName', v)}
                  placeholder="e.g., Region 17 ESC"
                />
              </FormField>
            )}

            <div style={{
              background: `${COLORS.sky}15`,
              borderRadius: '10px',
              padding: '14px 16px',
              marginTop: '8px',
            }}>
              <p style={{ margin: 0, fontSize: '13px', color: COLORS.navy, lineHeight: '1.5' }}>
                <strong>Note:</strong> TRS-participating districts have different FICA savings calculations. 
                Employees in these districts qualify based on Medicare and FIT savings only (no Social Security).
              </p>
            </div>
          </FormSection>
        )}

        {/* Section 4: Payroll Information */}
        <FormSection 
          number={isSchoolDistrict ? "4" : "3"} 
          title="Payroll Information" 
          description="Help us understand your payroll setup"
        >
          <FormGrid>
            <div data-field="payFrequency">
              <FormField label="Pay Frequency" required error={errors.payFrequency}>
                <SelectInput
                  value={formData.payFrequency}
                  onChange={(v) => updateField('payFrequency', v)}
                  options={PAY_FREQUENCIES}
                  error={errors.payFrequency}
                />
              </FormField>
            </div>
            <FormField label="Payroll Provider">
              <SelectInput
                value={formData.payrollProvider}
                onChange={(v) => updateField('payrollProvider', v)}
                options={PAYROLL_PROVIDERS}
              />
            </FormField>
          </FormGrid>

          {formData.payrollProvider === 'Other' && (
            <FormField label="Other Payroll Provider">
              <TextInput
                value={formData.payrollProviderOther}
                onChange={(v) => updateField('payrollProviderOther', v)}
                placeholder="Please specify"
              />
            </FormField>
          )}
          
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
            borderRadius: '12px',
          }}>
            <p style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '600', color: COLORS.navy }}>
              Employee Counts
            </p>
            <FormGrid columns={3}>
              <div data-field="employeeCountFulltime">
                <FormField label="Full-Time" required error={errors.employeeCountFulltime}>
                  <TextInput
                    type="number"
                    value={formData.employeeCountFulltime}
                    onChange={(v) => updateField('employeeCountFulltime', v)}
                    placeholder="0"
                    error={errors.employeeCountFulltime}
                  />
                </FormField>
              </div>
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
                  value={formData.employeeCountTotal || 
                    (parseInt(formData.employeeCountFulltime || 0) + parseInt(formData.employeeCountParttime || 0))}
                  onChange={(v) => updateField('employeeCountTotal', v)}
                  placeholder="0"
                  disabled
                />
              </FormField>
            </FormGrid>
          </div>
        </FormSection>

        {/* Section 5: Current Benefits */}
        <FormSection 
          number={isSchoolDistrict ? "5" : "4"} 
          title="Current Benefits" 
          description="Tell us about your existing benefits setup"
        >
          <FormGrid>
            <FormField label="Current Health Insurance Carrier">
              <TextInput
                value={formData.healthInsuranceCarrier}
                onChange={(v) => updateField('healthInsuranceCarrier', v)}
                placeholder="e.g., Blue Cross Blue Shield"
              />
            </FormField>
            <FormField label="Fiscal Year End">
              <TextInput
                type="date"
                value={formData.fiscalYearEnd}
                onChange={(v) => updateField('fiscalYearEnd', v)}
              />
            </FormField>
          </FormGrid>

          <FormGrid>
            <FormField label="Do you have an existing Section 125 plan?">
              <RadioGroup
                name="hasSection125"
                value={formData.hasSection125}
                onChange={(v) => updateField('hasSection125', v)}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'unsure', label: 'Not Sure' },
                ]}
              />
            </FormField>
            <FormField label="Do you have union employees?">
              <RadioGroup
                name="hasUnionEmployees"
                value={formData.hasUnionEmployees}
                onChange={(v) => updateField('hasUnionEmployees', v)}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
              />
            </FormField>
          </FormGrid>
        </FormSection>

        {/* Section 6: Census Upload */}
        <FormSection 
          number={isSchoolDistrict ? "6" : "5"} 
          title="Employee Census" 
          description="Upload your employee data for eligibility analysis"
        >
          <div data-field="censusFile">
            <FileUpload
              file={formData.censusFile}
              onFileSelect={(file) => updateField('censusFile', file)}
              onFileRemove={() => updateField('censusFile', null)}
            />
            {errors.censusFile && (
              <p style={{ margin: '8px 0 0', fontSize: '13px', color: COLORS.red }}>{errors.censusFile}</p>
            )}
          </div>

          <div style={{
            background: COLORS.gray,
            borderRadius: '10px',
            padding: '20px',
            marginTop: '16px',
          }}>
            <p style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '600', color: COLORS.navy }}>
              Required Fields
            </p>
            <ul style={{ margin: '0 0 12px', paddingLeft: '20px', fontSize: '13px', color: COLORS.grayDark, lineHeight: '1.8' }}>
              <li><strong>Employee Name</strong> (first and last)</li>
              <li><strong>Email Address</strong></li>
              <li><strong>Annual Salary</strong> OR <strong>Hourly Rate + Weekly Hours</strong></li>
              <li><strong>Pay Type</strong> (Salary or Hourly)</li>
              <li><strong>Federal Income Tax (FIT) Withheld Per Paycheck</strong> — <em style={{ color: COLORS.navy }}>Critical for accurate analysis</em></li>
              <li><strong>Filing Status</strong> (Single, Married Filing Jointly, Head of Household)</li>
              <li><strong>Employment Type</strong> (Full-time or Part-time)</li>
            </ul>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: COLORS.grayDark, lineHeight: '1.6' }}>
              <strong>Optional but helpful:</strong> Department, Hire Date, TRS status (for school districts)
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: COLORS.sky }}>
              <button
                type="button"
                onClick={downloadCensusTemplate}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: COLORS.sky,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                }}
              >
                Download census template →
              </button>
            </p>
          </div>
        </FormSection>

        {/* Section 7: Monthly Updates */}
        <FormSection 
          number={isSchoolDistrict ? "7" : "6"} 
          title="Monthly Updates" 
          description="How would you prefer to handle ongoing roster changes?"
        >
          <RadioGroup
            name="updatePreference"
            value={formData.updatePreference}
            onChange={(v) => updateField('updatePreference', v)}
            options={[
              { value: 'self-service', label: 'Self-service portal (I\'ll update when employees change)' },
              { value: 'email', label: 'Email updates (I\'ll send you updated lists monthly)' },
              { value: 'payroll-feed', label: 'Automated payroll feed (if available)' },
            ]}
          />
        </FormSection>

        {/* Section 8: Additional Notes */}
        <FormSection 
          number={isSchoolDistrict ? "8" : "7"} 
          title="Additional Information" 
          description="Anything else we should know?"
        >
          <FormField label="Special Circumstances or Notes" fullWidth>
            <TextArea
              value={formData.specialCircumstances}
              onChange={(v) => updateField('specialCircumstances', v)}
              placeholder="Any unique situations, questions, or details that would help us serve you better..."
              rows={4}
            />
          </FormField>
        </FormSection>

        {/* Section 9: Signature */}
        <FormSection 
          number={isSchoolDistrict ? "9" : "8"} 
          title="Authorization & Signature" 
          description="Review and sign to submit"
        >
          <div style={{
            background: COLORS.gray,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
          }}>
            <div data-field="agreedToTerms" style={{ marginBottom: '16px' }}>
              <Checkbox
                checked={formData.agreedToTerms}
                onChange={(v) => updateField('agreedToTerms', v)}
                label={
                  <span>
                    I certify that the information provided is accurate and complete to the best of my knowledge. 
                    I understand that Live Well 360 will use this information to conduct an eligibility analysis.
                  </span>
                }
              />
              {errors.agreedToTerms && (
                <p style={{ margin: '4px 0 0 28px', fontSize: '12px', color: COLORS.red }}>{errors.agreedToTerms}</p>
              )}
            </div>
            <div data-field="agreedToAnalysis">
              <Checkbox
                checked={formData.agreedToAnalysis}
                onChange={(v) => updateField('agreedToAnalysis', v)}
                label={
                  <span>
                    I authorize Live Well 360 Health Strategy Advisors to analyze the provided employee data 
                    and contact me regarding the SIMRP program and eligibility results.
                  </span>
                }
              />
              {errors.agreedToAnalysis && (
                <p style={{ margin: '4px 0 0 28px', fontSize: '12px', color: COLORS.red }}>{errors.agreedToAnalysis}</p>
              )}
            </div>
          </div>

          <FormGrid>
            <div data-field="signatureName">
              <FormField label="Signature (Type Full Name)" required error={errors.signatureName}>
                <TextInput
                  value={formData.signatureName}
                  onChange={(v) => updateField('signatureName', v)}
                  placeholder="Type your full name"
                  error={errors.signatureName}
                />
              </FormField>
            </div>
            <FormField label="Title">
              <TextInput
                value={formData.signatureTitle}
                onChange={(v) => updateField('signatureTitle', v)}
                placeholder="Your title"
              />
            </FormField>
          </FormGrid>

          <FormField label="Date">
            <TextInput
              type="date"
              value={formData.signatureDate || new Date().toISOString().split('T')[0]}
              onChange={(v) => updateField('signatureDate', v)}
            />
          </FormField>
        </FormSection>

        {/* Submit Button */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              padding: '16px 48px',
              fontSize: '17px',
              fontWeight: '700',
              color: COLORS.white,
              background: isSubmitting 
                ? COLORS.grayDark 
                : `linear-gradient(135deg, ${COLORS.lime}, #5fa832)`,
              border: 'none',
              borderRadius: '12px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: isSubmitting ? 'none' : `0 4px 20px ${COLORS.lime}50`,
              transition: 'all 0.2s',
              minWidth: '250px',
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Intake Form'}
          </button>
          
          <p style={{ margin: '20px 0 0', fontSize: '14px', color: COLORS.grayDark }}>
            Questions? Call us at{' '}
            <a href="tel:8067991099" style={{ color: COLORS.sky, textDecoration: 'none', fontWeight: '600' }}>
              (806) 799-1099
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: COLORS.navy,
        padding: '24px 20px',
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, fontSize: '13px', color: COLORS.sky, opacity: 0.8 }}>
          © {new Date().getFullYear()} Live Well 360 Health Strategy Advisors | 6609 Toledo Avenue Ste. 1, Lubbock, TX
        </p>
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: COLORS.grayDark }}>
          <a href="https://www.livewellhealth360.com/privacy" style={{ color: COLORS.grayDark, textDecoration: 'none', marginRight: '16px' }}>
            Privacy Policy
          </a>
          <a href="https://www.livewellhealth360.com/terms" style={{ color: COLORS.grayDark, textDecoration: 'none' }}>
            Terms of Service
          </a>
        </p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  return <IntakeForm />;
}
