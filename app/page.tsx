"use client"

import { useState } from "react"
import { ArrowRight, Zap, Brain, Mic, Camera, Sparkles } from "lucide-react"
import { AnimatedButton } from "@/components/animated-button"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <main className="min-h-screenx flex flex-col">
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex flex-col justify-center items-center px-6 py-10 md:py-16">
        <div className="max-w-6xl w-full grid md:grid-cols-2 items-center gap-10 animate-slide-in">
          {/* Left: Text */}
          <div className="space-y-6 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
                <Zap className="relative text-primary" size={64} strokeWidth={1.5} />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#2563eb] leading-tight">
              Give{" "} 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Nature
              </span>{" "}
              A Voice
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed mx-auto md:mx-0">
              Discover the unseen world of emotions within animals. Our AI models
              transform sounds, visuals, and gestures into emotional insights — bridging
              the gap between humans and wildlife communication.
            </p>

            <div className="pt-2">
              <Link href="/models">
                <AnimatedButton
                  size="lg"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`transition-transform ${isHovering ? "scale-105" : ""}`}
                >
                  Get Started
                  <ArrowRight size={20} />
                </AnimatedButton>
              </Link>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative w-full h-[320px] md:h-[440px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=800&q=80"
              alt="Animal Communication AI"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Features Preview */}
        <div className="pt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          {[
            {
              label: "Image Analysis",
              desc: "Detect posture, expressions, and micro-behaviors using deep visual recognition.",
              icon: <Camera />,
            },
            {
              label: "Voice Analysis",
              desc: "Understand tone, rhythm, and frequency to interpret emotional states in sounds.",
              icon: <Mic />,
            },
            {
              label: "Text Analysis",
              desc: "Analyze written observations or notes to uncover emotional cues and context.",
              icon: <Brain />,
            },
          ].map((feature) => (
            <div
              key={feature.label}
              className="bg-white/80 border border-gray-200 rounded-xl p-6 backdrop-blur hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-primary mb-3">
                {feature.icon}
                <p className="font-semibold text-[#2563eb] text-base">{feature.label}</p>
              </div>
              <p className="text-muted text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="bg-gradient-to-b from-blue-100 via-white to-purple-100 py-14 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#2563eb]">How It Works</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto mt-3">
              Using multimodal AI, our system reads the emotional data hidden in sounds,
              images, and words. Here’s how it turns your input into actionable insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Capture or Upload",
                desc: "Use your camera or microphone to capture real-time animal behavior, or upload recorded data.",
                img: "https://media.istockphoto.com/id/1291751221/photo/the-sales-department-scores-again.webp?a=1&b=1&s=612x612&w=0&k=20&c=eLEEzx6Bt0-Y3Cj2QKudklHo9sBd4vzXO4Fvt9eLzjk=",
              },
              {
                title: "2. AI Processing",
                desc: "Our neural models decode patterns in tone, motion, and context using deep learning algorithms.",
                img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "3. Decode & Learn",
                desc: "Get detailed emotional summaries, intensity levels, and suggested behavioral insights instantly.",
                img: "https://media.istockphoto.com/id/1307252605/photo/innovative-idea-in-businessman-hand.webp?a=1&b=1&s=612x612&w=0&k=20&c=wn8TnpOGi4R9QLOzOtE4LUnFaDIQJBk3ENYWmBlO7bI=",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white/80 border border-gray-200 rounded-xl overflow-hidden hover:-translate-y-2 transition-all"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-primary">{step.title}</h3>
                  <p className="text-sm text-muted mt-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGY / VISION SECTION ================= */}
      <section className="bg-gradient-to-b from-purple-100 via-white to-blue-50 py-14 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#2563eb] ">Technology & Vision</h2>
            <p className="text-muted text-lg leading-relaxed">
              Our hybrid AI models blend computer vision, sound recognition, and language
              processing to read emotional nuances from diverse species. We continuously
              train on real-world datasets to refine empathy-driven intelligence.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-white/80 p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-primary mb-2">Deep Neural Models</h3>
                <p className="text-sm text-muted">
                  Multi-layer CNNs and RNNs detect cross-species emotion signatures, 
                  adapting dynamically to new sound and image inputs.
                </p>
              </div>
              <div className="bg-white/80 p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-primary mb-2">Ethical Intelligence</h3>
                <p className="text-sm text-muted">
                  Built with ethical datasets and bias reduction systems, ensuring humane 
                  interpretation and data transparency.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/about">
                <AnimatedButton size="lg" className="bg-primary text-white hover:bg-primary/90 transition-colors">
                  Learn More <ArrowRight size={20} />
                </AnimatedButton>
              </Link>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://media.istockphoto.com/id/1151390404/photo/circular-maze-or-labyrinth-with-light-bulb-in-its-center-puzzle-riddle-intelligence-thinking.webp?a=1&b=1&s=612x612&w=0&k=20&c=y2li3Kc-FmsZzuC7L_DB94BFd1YvhLZPA0HJ3a_WlvM="
              alt="AI Technology"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
