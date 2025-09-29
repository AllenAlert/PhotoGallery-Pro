import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    photographer: { email: 'alex@photogallery.com', password: 'photographer123' },
    client: { email: 'sarah@email.com', password: 'client123' }
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
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const { email, password } = formData;
      
      // Check against mock credentials
      const isPhotographer = email === mockCredentials?.photographer?.email && 
                            password === mockCredentials?.photographer?.password;
      const isClient = email === mockCredentials?.client?.email && 
                      password === mockCredentials?.client?.password;
      
      if (isPhotographer) {
        localStorage.setItem('userRole', 'photographer');
        localStorage.setItem('userEmail', email);
        navigate('/admin-dashboard');
      } else if (isClient) {
        localStorage.setItem('userRole', 'client');
        localStorage.setItem('userEmail', email);
        navigate('/client-gallery-view');
      } else {
        setErrors({
          general: `Invalid credentials. Try:\nPhotographer: ${mockCredentials?.photographer?.email} / ${mockCredentials?.photographer?.password}\nClient: ${mockCredentials?.client?.email} / ${mockCredentials?.client?.password}`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate Google OAuth
    setTimeout(() => {
      localStorage.setItem('userRole', 'photographer');
      localStorage.setItem('userEmail', 'alex@photogallery.com');
      navigate('/admin-dashboard');
    }, 2000);
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg gallery-shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Camera" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your PhotoGallery Pro account</p>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-error whitespace-pre-line">{errors?.general}</div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="mb-4"
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              className="mb-4"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground gallery-transition"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
            />
            
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-accent hover:text-accent/80 gallery-transition"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            fullWidth
            className="mt-6"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Google Login */}
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          loading={isLoading}
          fullWidth
          className="mb-6"
        >
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </div>
        </Button>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-accent hover:text-accent/80 font-medium gallery-transition"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
      {/* Security Indicators */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Icon name="Shield" size={14} className="mr-1" />
            SSL Secured
          </div>
          <div className="flex items-center">
            <Icon name="Lock" size={14} className="mr-1" />
            256-bit Encryption
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;