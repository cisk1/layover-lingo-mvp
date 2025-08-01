"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User, Loader2 } from "lucide-react"
import { useAuth } from "./auth-context"

interface AuthModalsProps {
  isLoginOpen: boolean
  isSignupOpen: boolean
  onLoginClose: () => void
  onSignupClose: () => void
  onSwitchToSignup: () => void
  onSwitchToLogin: () => void
}

export default function AuthModals({
  isLoginOpen,
  isSignupOpen,
  onLoginClose,
  onSignupClose,
  onSwitchToSignup,
  onSwitchToLogin,
}: AuthModalsProps) {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [loginError, setLoginError] = useState("")
  const [signupError, setSignupError] = useState("")

  const { login, signup, isLoading } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    try {
      await login(loginEmail, loginPassword)
      onLoginClose()
      setLoginEmail("")
      setLoginPassword("")
    } catch (error) {
      setLoginError("Invalid email or password")
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError("")

    if (signupPassword.length < 6) {
      setSignupError("Password must be at least 6 characters")
      return
    }

    try {
      await signup(signupEmail, signupPassword, signupName)
      onSignupClose()
      setSignupEmail("")
      setSignupPassword("")
      setSignupName("")
    } catch (error) {
      setSignupError("Failed to create account")
    }
  }

  return (
    <>
      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={onLoginClose}>
        <DialogContent className="max-w-md bg-[#2c2e31] border-[#3c3e41]">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Welcome back</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="pl-10 bg-[#3c3e41] border-0 text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="pl-10 bg-[#3c3e41] border-0 text-white placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {loginError && <div className="text-red-400 text-sm">{loginError}</div>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#e2b714] hover:bg-[#d4a613] text-[#323437] font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <button type="button" onClick={onSwitchToSignup} className="text-[#e2b714] hover:underline">
                Sign up
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={isSignupOpen} onOpenChange={onSignupClose}>
        <DialogContent className="max-w-md bg-[#2c2e31] border-[#3c3e41]">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Create account</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name" className="text-white">
                Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="signup-name"
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="pl-10 bg-[#3c3e41] border-0 text-white placeholder-gray-400"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="signup-email"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="pl-10 bg-[#3c3e41] border-0 text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="signup-password"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="pl-10 bg-[#3c3e41] border-0 text-white placeholder-gray-400"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            {signupError && <div className="text-red-400 text-sm">{signupError}</div>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#e2b714] hover:bg-[#d4a613] text-[#323437] font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button type="button" onClick={onSwitchToLogin} className="text-[#e2b714] hover:underline">
                Sign in
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
