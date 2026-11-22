'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

type AuthMode = 'login' | 'register';
type LoginMethod = 'mobile' | 'email' | 'whatsapp';
type OtpStep = 'input' | 'verify' | 'success';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('mobile');
  const [otpStep, setOtpStep] = useState<OtpStep>('input');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const handleSendOtp = () => {
    if (!mobile || mobile.length < 10) return;
    setLoading(true);
    setTimeout(() => {setLoading(false);setOtpStep('verify');setCountdown(30);}, 1500);
  };

  const handleOtpChange = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  const handleVerifyOtp = () => {
    if (otp.join('').length < 6) return;
    setLoading(true);
    setTimeout(() => {setLoading(false);setOtpStep('success');}, 1500);
  };

  const handleEmailLogin = () => {
    setLoading(true);
    setTimeout(() => {setLoading(false);setOtpStep('success');}, 1500);
  };

  const handleWhatsAppLogin = () => {
    setLoading(true);
    setTimeout(() => {setLoading(false);setOtpStep('success');}, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - brand imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ borderBottomRightRadius: '80px', borderTopRightRadius: '80px' }}>
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_178aea2ce-1775212387987.png"
          alt="Super Syno fashion collection, dark moody editorial, premium clothing, dim atmospheric lighting, deep shadows"
          fill className="object-cover"
          sizes="50vw" priority />

        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/30" />
        <div className="relative z-10 flex flex-col justify-between p-14 h-full">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo size={40} />
            <span className="font-display font-bold text-2xl text-white">Super Syno</span>
          </Link>
          <div>
            <h2 className="font-display font-black text-5xl text-white tracking-tighter leading-tight mb-4">
              Your Style,<br /><span className="gradient-text">Your Story.</span>
            </h2>
            <p className="text-white/60 text-lg mb-8">Join 50,000+ fashion lovers who shop with Super Syno.</p>
            <div className="flex flex-col gap-3">
              {[
              { icon: 'SparklesIcon', text: 'Exclusive member-only deals' },
              { icon: 'HeartIcon', text: 'Save items to your wishlist' },
              { icon: 'TruckIcon', text: 'Track orders in real-time' },
              { icon: 'ArrowPathIcon', text: 'Hassle-free returns within 15 days' }].
              map((b) =>
              <div key={b.text} className="flex items-center gap-3 text-white/80 text-sm">
                  <Icon name={b.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-accent" />
                  {b.text}
                </div>
              )}
            </div>
          </div>
          <p className="text-white/30 text-xs">© 2026 Super Syno. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel - auth form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <AppLogo size={36} />
            <span className="font-display font-bold text-xl">Super Syno</span>
          </div>

          {otpStep === 'success' ?
          <SuccessState /> :

          <>
              {/* Mode toggle */}
              <div className="flex bg-secondary rounded-2xl p-1 mb-8">
                {(['login', 'register'] as AuthMode[]).map((m) =>
              <button key={m} onClick={() => {setMode(m);setOtpStep('input');setOtp(['', '', '', '', '', '']);}}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200 capitalize ${mode === m ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                    {m === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
              )}
              </div>

              <h1 className="font-display font-black text-3xl tracking-tight mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Join Super Syno'}
              </h1>
              <p className="text-muted-foreground text-sm mb-8">
                {mode === 'login' ? 'Sign in to your account to continue shopping' : 'Create your account in 30 seconds'}
              </p>

              {/* Register name field */}
              {mode === 'register' &&
            <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Priya Sharma"
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                </div>
            }

              {/* Login method tabs */}
              <div className="flex gap-2 mb-6">
                {([
              { id: 'mobile', label: 'Mobile OTP', icon: 'DevicePhoneMobileIcon' },
              { id: 'email', label: 'Email', icon: 'EnvelopeIcon' },
              { id: 'whatsapp', label: 'WhatsApp', icon: 'ChatBubbleLeftRightIcon' }] as
              {id: LoginMethod;label: string;icon: string;}[]).map((m) =>
              <button key={m.id} onClick={() => {setLoginMethod(m.id);setOtpStep('input');setOtp(['', '', '', '', '', '']);}}
              className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-xs font-semibold transition-all ${loginMethod === m.id ? 'border-accent bg-accent/10 text-accent' : 'border-border text-muted-foreground hover:border-accent/50'}`}>
                    <Icon name={m.icon as Parameters<typeof Icon>[0]['name']} size={18} />
                    <span className="hidden sm:block">{m.label}</span>
                  </button>
              )}
              </div>

              {/* Mobile OTP flow */}
              {loginMethod === 'mobile' &&
            <div className="space-y-4">
                  {otpStep === 'input' &&
              <>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Mobile Number</label>
                        <div className="flex gap-2">
                          <span className="flex items-center px-3 py-3 rounded-xl border border-border bg-secondary text-sm font-medium text-muted-foreground">🇮🇳 +91</span>
                          <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="98765 43210" maxLength={10}
                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                        </div>
                      </div>
                      <button onClick={handleSendOtp} disabled={loading || mobile.length < 10}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-sm hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {loading ? <><div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Sending OTP...</> : 'Send OTP'}
                      </button>
                    </>
              }

                  {otpStep === 'verify' &&
              <>
                      <p className="text-sm text-muted-foreground">OTP sent to +91 {mobile}</p>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Enter 6-digit OTP</label>
                        <div className="flex gap-2 justify-between">
                          {otp.map((digit, idx) =>
                    <input key={idx} ref={(el) => {otpRefs.current[idx] = el;}}
                    type="tel" maxLength={1} value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    className="otp-input" />
                    )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <button disabled={countdown > 0}
                  onClick={() => {setCountdown(30);setOtp(['', '', '', '', '', '']);}}
                  className="text-accent font-semibold disabled:text-muted-foreground disabled:cursor-not-allowed">
                          {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                        </button>
                        <button onClick={() => setOtpStep('input')} className="text-muted-foreground hover:text-foreground">Change number</button>
                      </div>
                      <button onClick={handleVerifyOtp} disabled={loading || otp.join('').length < 6}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-sm hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                        {loading ? <><div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Verifying...</> : 'Verify & Continue'}
                      </button>
                    </>
              }
                </div>
            }

              {/* Email flow */}
              {loginMethod === 'email' &&
            <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@example.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Password</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent transition-all" />
                      <button onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1">
                        <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                      </button>
                    </div>
                  </div>
                  {mode === 'login' &&
              <div className="text-right"><a href="#" className="text-xs text-accent font-semibold hover:underline">Forgot Password?</a></div>
              }
                  <button onClick={handleEmailLogin} disabled={loading || !email || !password}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-sm hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? <><div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />{mode === 'login' ? 'Signing in...' : 'Creating account...'}</> : mode === 'login' ? 'Sign In with Email' : 'Create Account'}
                  </button>
                </div>
            }

              {/* WhatsApp flow */}
              {loginMethod === 'whatsapp' &&
            <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-800">Login with WhatsApp</p>
                      <p className="text-xs text-green-600 mt-0.5">We will send a verification link to your WhatsApp number</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">WhatsApp Number</label>
                    <div className="flex gap-2">
                      <span className="flex items-center px-3 py-3 rounded-xl border border-border bg-secondary text-sm font-medium text-muted-foreground">🇮🇳 +91</span>
                      <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="98765 43210" maxLength={10}
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent transition-all" />
                    </div>
                  </div>
                  <button onClick={handleWhatsAppLogin} disabled={loading || mobile.length < 10}
              className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Connecting WhatsApp...</> : <><Icon name="ChatBubbleLeftRightIcon" size={16} />Continue with WhatsApp</>}
                  </button>
                </div>
            }

              <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
                By continuing, you agree to Super Syno&apos;s{' '}
                <a href="#" className="text-accent font-semibold hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-accent font-semibold hover:underline">Privacy Policy</a>
              </div>
            </>
          }
        </div>
      </div>
    </div>);

}

function SuccessState() {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
        <Icon name="CheckIcon" size={36} className="text-white" />
      </div>
      <h2 className="font-display font-black text-3xl mb-2">You&apos;re In!</h2>
      <p className="text-muted-foreground mb-8">Welcome to Super Syno. Your account is ready.</p>
      <Link href="/"
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
        Start Shopping
        <Icon name="ArrowRightIcon" size={16} />
      </Link>
    </div>);

}