"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Target,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Star,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

const features = [
  {
    icon: TrendingUp,
    title: "NIT & IIIT Cutoff Engine",
    description: "Real-time cutoff predictions for all NITs and IIITs based on historical data and AI algorithms.",
  },
  {
    icon: BarChart3,
    title: "CSAB Round Predictor",
    description: "Accurate predictions for CSAB rounds with category-wise and state-wise analysis.",
  },
  {
    icon: Target,
    title: "Rank Band Analyzer",
    description: "Analyze your rank range and discover all possible college-branch combinations.",
  },
  {
    icon: Briefcase,
    title: "Placement Intelligence",
    description: "Compare placement statistics, average packages, and top recruiters across colleges.",
  },
];

const stats = [
  { value: "50K+", label: "Students Helped" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "500+", label: "Colleges Analyzed" },
  { value: "10K+", label: "Successful Admissions" },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    rank: "AIR 12,000",
    college: "NIT Trichy - CSE",
    text: "The predictions were spot-on! Got into my dream college exactly as predicted.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    rank: "AIR 8,500",
    college: "IIIT Hyderabad - CSE",
    text: "The rank band analyzer helped me understand all my options. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    rank: "AIR 15,000",
    college: "NIT Warangal - ECE",
    text: "Best counselling tool I've used. The placement insights were incredibly helpful.",
    rating: 5,
  },
];

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Counseling Adda
            </Link>
            <nav className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <Link href="/predict">
                    <Button>Get Started</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 -left-4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            animate={{
              x: [0, 100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute top-0 -right-4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                India's Smartest
              </span>
              <br />
              <span className="text-slate-900 dark:text-slate-100">
                Counseling Adda
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
              AI-powered college prediction based on rank, category & quota.
              Make informed decisions with precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Everything you need to make the right choice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card variant="glass" className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by Students
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              See what our users have to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glass" className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <CardDescription className="text-base">
                      "{testimonial.text}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.rank} • {testimonial.college}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 dark:bg-black text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Counseling Adda
            </h3>
              <p className="text-sm">
                India's most trusted AI-powered college prediction platform.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/predict" className="hover:text-white transition-colors">
                    Predict Colleges
                  </Link>
                </li>
                <li>
                  <Link href="/rank-band" className="hover:text-white transition-colors">
                    Rank Band Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/compare" className="hover:text-white transition-colors">
                    Compare Colleges
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm">
            © 2026 Counseling Adda. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
