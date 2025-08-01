"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Check, X, Zap } from "lucide-react"

interface PaywallModalProps {
  isOpen: boolean
  onClose: () => void
  feature: string
}

export default function PaywallModal({ isOpen, onClose, feature }: PaywallModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#2c2e31] border-[#3c3e41]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-[#e2b714]" />
              <DialogTitle className="text-xl text-[#e2b714]">Upgrade to Pro</DialogTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Feature highlight */}
          <div className="text-center p-4 bg-[#3c3e41] rounded-lg">
            <Zap className="w-8 h-8 text-[#e2b714] mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">{feature}</h3>
            <p className="text-gray-300 text-sm">This premium feature helps you master phrases faster</p>
          </div>

          {/* Pro features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">LayoverLingo Pro includes:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Interactive quiz mode with spaced repetition</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Offline access to all phrases and tips</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Progress tracking and learning analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Premium audio from native speakers</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Early access to new countries and phrases</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-r from-[#e2b714] to-[#d4a613] p-4 rounded-lg text-center">
            <div className="text-[#323437] font-bold text-2xl mb-1">$4.99/month</div>
            <div className="text-[#323437] text-sm opacity-80">or $39.99/year (save 33%)</div>
            <Badge className="bg-white/20 text-[#323437] mt-2">7-day free trial</Badge>
          </div>

          {/* CTA buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-[#e2b714] hover:bg-[#d4a613] text-[#323437] font-semibold py-3">
              <Crown className="w-4 h-4 mr-2" />
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#3c3e41] text-gray-300 hover:bg-[#3c3e41] bg-transparent"
            >
              Learn More
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400">Cancel anytime • No commitment • Secure payment</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
