"use client"

import { useRouter } from "next/navigation"
import { Camera, Mic, FileText, ArrowLeft, Sparkles } from "lucide-react"
import { AnalysisCard } from "@/components/analysis-card"

export default function ModelsPage() {
  const router = useRouter()

  const models = [
    {
      id: "image",
      title: "Image Analysis",
      description: "Identify animal species, detect emotions, and observe subtle cues from visual features.",
      icon: <Camera size={32} />,
      route: "/analysis/image",
    },
    {
      id: "voice",
      title: "Voice Analysis",
      description: "Analyze animal sounds, detect stress levels, and decode emotional tones from audio.",
      icon: <Mic size={32} />,
      route: "/analysis/voice",
    },
    {
      id: "text",
      title: "Text Analysis",
      description: "Interpret behavior patterns and emotional responses through descriptive observations.",
      icon: <FileText size={32} />,
      route: "/analysis/text",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 px-4 py-10 md:py-14">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 animate-slide-in">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/70 border border-gray-200 rounded-lg transition-smooth"
          >
            <ArrowLeft size={24} className="text-[#2563eb]" />
          </button>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2563eb]">Choose Analysis Model</h1>
            <p className="text-gray-600 mt-2 text-lg">
              Select your preferred method to decode animal emotions and communication.
            </p>
          </div>
        </div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {models.map((model) => (
            <AnalysisCard
              key={model.id}
              title={model.title}
              description={model.description}
              icon={model.icon}
              onClick={() => router.push(model.route)}
              className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white/80 border border-gray-200 rounded-xl"
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-white/80 border border-gray-200 rounded-xl p-8 backdrop-blur-sm animate-fade-in space-y-6">
          <div className="flex items-center gap-2 justify-center">
            <Sparkles className="text-[#2563eb]" size={28} />
            <h2 className="text-3xl font-bold text-[#2563eb]">How It Works</h2>
          </div>

          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Each model leverages deep neural networks trained on diverse animal datasets to translate emotions into human-understandable insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            {[
              {
                step: "01",
                title: "Upload Content",
                desc: "Provide an image, audio clip, or text about the animal — our system will handle preprocessing.",
              },
              {
                step: "02",
                title: "AI Processing",
                desc: "Our hybrid AI models analyze emotional tones, stress indicators, and behavioral intent.",
              },
              {
                step: "03",
                title: "Get Insights",
                desc: "Receive a structured emotional summary and recommendations based on analysis.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="space-y-2 text-center p-5 rounded-lg bg-gradient-to-br from-blue-50 to-white border border-gray-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl font-bold text-[#2563eb]">{item.step}</div>
                <h3 className="font-semibold text-[#2563eb] text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
