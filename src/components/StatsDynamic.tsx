import React, { useEffect, useState, useRef } from 'react';
import { Users, Stethoscope, Award, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const StatsDynamic: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Calcola statistiche dinamiche
  const activeDoctors = state.doctors.filter(d => d.isActive).length;
  const activeSpecs = state.specializations.filter(s => s.isActive).length;

  const stats = [
    {
      icon: Users,
      value: activeDoctors,
      suffix: '+',
      label: 'Medici Specialisti',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Stethoscope,
      value: activeSpecs,
      suffix: '+',
      label: 'Branche Mediche',
      color: 'from-teal-500 to-teal-600',
    },
    {
      icon: Award,
      value: 100,
      suffix: '%',
      label: 'Tecnologie Avanzate',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Clock,
      value: 10,
      suffix: '+',
      label: 'Anni di Esperienza',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const CountUp: React.FC<{ end: number; suffix: string }> = ({ end, suffix }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [end, isVisible]);

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden"
    >
      {/* Pattern decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            I Nostri Numeri
          </h2>
          <p className="text-blue-200 max-w-xl mx-auto">
            Dati che testimoniano la nostra dedizione alla salute dei pazienti
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon size={28} className="text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-blue-200 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsDynamic;
