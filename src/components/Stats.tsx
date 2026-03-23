import { useEffect, useState, useRef } from 'react';
import { Users, Stethoscope, Microscope, Award } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);
  
  return count;
}

function StatCard({ icon, value, suffix, label, isVisible }: StatItem & { isVisible: boolean }) {
  const count = useCountUp(value, 2000, isVisible);
  
  return (
    <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <div className="text-4xl font-bold text-blue-900 mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  );
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const stats: StatItem[] = [
    {
      icon: <Users size={32} />,
      value: 20,
      suffix: '+',
      label: 'Medici Specialisti',
    },
    {
      icon: <Stethoscope size={32} />,
      value: 18,
      suffix: '',
      label: 'Branche Mediche',
    },
    {
      icon: <Microscope size={32} />,
      value: 100,
      suffix: '%',
      label: 'Tecnologie all\'avanguardia',
    },
    {
      icon: <Award size={32} />,
      value: 10,
      suffix: '+',
      label: 'Anni di Esperienza',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            I nostri numeri parlano per noi
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Da anni ci prendiamo cura della salute dei nostri pazienti con dedizione, professionalità e le migliori tecnologie disponibili.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
