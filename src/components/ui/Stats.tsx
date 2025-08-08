'use client';

import { useState, useEffect, useCallback } from 'react';

interface StatItem {
  number: number;
  label: string;
  suffix?: string;
}

interface StatsProps {
  items: StatItem[];
}

export default function Stats({ items }: StatsProps) {
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>(new Array(items.length).fill(0));

  const animateNumbers = useCallback(() => {
    items.forEach((item, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = item.number / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= item.number) {
          current = item.number;
          clearInterval(timer);
        }
        setAnimatedNumbers(prev => {
          const newNumbers = [...prev];
          newNumbers[index] = Math.floor(current);
          return newNumbers;
        });
      }, duration / steps);
    });
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumbers();
        }
      });
    });

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [animateNumbers]);

  return (
    <section id="stats-section" className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, index) => (
            <div key={index} className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {animatedNumbers[index].toLocaleString()}{item.suffix}
              </div>
              <div className="text-yellow-100 text-sm md:text-base">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
