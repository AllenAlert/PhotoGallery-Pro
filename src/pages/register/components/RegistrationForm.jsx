import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ onGoogleSignUp }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'photographer',
    agreeToTerms: false,
    subscribeNewsletter: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const requirements = {
      length: password?.length >= 8,
      uppercase: /[A-Z]/?.test(password),
      lowercase: /[a-z]/?.test(password),
      number: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
    return requirements;
  };

  const getPasswordStrength = (password) => {
    const requirements = validatePassword(password);
    const score = Object.values(requirements)?.filter(Boolean)?.length;
    
    if (score < 2) return { strength: 'weak', color: 'text-error', bgColor: 'bg-error' };
    if (score < 4) return { strength: 'medium', color: 'text-warning', bgColor: 'bg-warning' };
    return { strength: 'strong', color: 'text-success', bgColor: 'bg-success' };
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      const requirements = validatePassword(formData?.password);
      if (!requirements?.length || !requirements?.uppercase || !requirements?.lowercase || !requirements?.number) {
        newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
      }
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      
      // Navigate based on account type
      if (formData?.accountType === 'photographer') {
        navigate('/admin-dashboard');
      } else {
        navigate('/client-gallery-view');
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = formData?.password ? getPasswordStrength(formData?.password) : null;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Account Type Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">I am a:</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, accountType: 'photographer' }))}
              className={`p-4 rounded-lg border-2 gallery-transition text-left ${
                formData?.accountType === 'photographer' ?'border-accent bg-accent/5 text-accent' :'border-border hover:border-accent/50'
              }`}
            >
              <Icon name="Camera" size={20} className="mb-2" />
              <div className="text-sm font-medium">Photographer</div>
              <div className="text-xs text-muted-foreground">Share & sell photos</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, accountType: 'client' }))}
              className={`p-4 rounded-lg border-2 gallery-transition text-left ${
                formData?.accountType === 'client' ?'border-accent bg-accent/5 text-accent' :'border-border hover:border-accent/50'
              }`}
            >
              <Icon name="User" size={20} className="mb-2" />
              <div className="text-sm font-medium">Client</div>
              <div className="text-xs text-muted-foreground">View & download</div>
            </button>
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={formData?.firstName}
            onChange={handleInputChange}
            placeholder="John"
            error={errors?.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData?.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
            error={errors?.lastName}
            required
          />
        </div>

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          placeholder="john@example.com"
          error={errors?.email}
          required
        />

        {/* Password */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder="Create a strong password"
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground gallery-transition"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {formData?.password && passwordStrength && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full gallery-transition ${passwordStrength?.bgColor} ${
                      passwordStrength?.strength === 'weak' ? 'w-1/3' :
                      passwordStrength?.strength === 'medium' ? 'w-2/3' : 'w-full'
                    }`}
                  />
                </div>
                <span className={`text-xs font-medium ${passwordStrength?.color}`}>
                  {passwordStrength?.strength?.charAt(0)?.toUpperCase() + passwordStrength?.strength?.slice(1)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-8 text-muted-foreground hover:text-foreground gallery-transition"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {/* Terms Agreement */}
        <div className="space-y-3">
          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <a href="#" className="text-accent hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-accent hover:underline">Privacy Policy</a>
              </span>
            }
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange(e)}
            name="agreeToTerms"
            error={errors?.agreeToTerms}
            required
          />
          
          <Checkbox
            label="Subscribe to newsletter for photography tips and updates"
            checked={formData?.subscribeNewsletter}
            onChange={(e) => handleInputChange(e)}
            name="subscribeNewsletter"
          />
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Google Sign Up */}
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={onGoogleSignUp}
          iconName="Chrome"
          iconPosition="left"
        >
          Sign up with Google
        </Button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-accent hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;