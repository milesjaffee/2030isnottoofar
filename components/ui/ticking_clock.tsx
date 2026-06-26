import { useState, useEffect } from 'react';

export default function TickingClock() {
  const [mounted, setMounted] = useState(false);
  const targetDate = new Date("Jan 1, 2030 00:00:00").getTime();
  const [time, setTime] = useState(new Date().getTime());
  const distance = targetDate - time;

  const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365))
  const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365))/ (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const timeleft = years+ " years, "+days+" days, "+hours+" hours, "+minutes+" minutes, and "+seconds+" seconds";

  useEffect(() => {
    setMounted(true);
    
    // Ticks the clock down every second
    const interval = setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Render nothing or a placeholder while loading to prevent server/client mismatch
  if (!mounted) return <div suppressHydrationWarning>Loading...</div>;

  return timeleft;
}