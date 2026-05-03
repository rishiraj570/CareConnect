import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, 
  Ruler, 
  Utensils, 
  Activity,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Info,
  ChevronRight,
  Flame,
  Apple,
  Dna
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DietPlanner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    gender: 'male',
    age: ''
  });
  const [result, setResult] = useState(null);
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

  const calculateBMI = (e) => {
    e.preventDefault();
    const heightInMeters = formData.height / 100;
    const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    
    let category = '';
    let color = '';
    let suggestion = '';
    let diet = [];

    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#3b82f6';
      suggestion = 'Focus on nutrient-dense, high-calorie foods to reach a healthy weight.';
      diet = [
        { meal: 'Protein Breakfast', menu: 'Whole grain toast with avocado and 2 eggs', cal: '450 kcal' },
        { meal: 'Balanced Lunch', menu: 'Grilled salmon with quinoa and sweet potatoes', cal: '650 kcal' },
        { meal: 'Nu-Snack', menu: 'Greek yogurt with nuts and honey', cal: '250 kcal' },
        { meal: 'Main Dinner', menu: 'Lean beef stir-fry with brown rice and olive oil', cal: '700 kcal' }
      ];
    } else if (bmi < 25) {
      category = 'Normal Weight';
      color = 'var(--primary)';
      suggestion = 'Maintain your healthy weight with a balanced diet and regular activity.';
      diet = [
        { meal: 'Vitality Morning', menu: 'Oatmeal with fresh berries and chia seeds', cal: '350 kcal' },
        { meal: 'Energy Lunch', menu: 'Mediterranean salad with chickpeas and feta', cal: '480 kcal' },
        { meal: 'Light Snack', menu: 'Apple slices with almond butter', cal: '180 kcal' },
        { meal: 'Lean Dinner', menu: 'Baked chicken breast with steamed broccoli', cal: '420 kcal' }
      ];
    } else if (bmi < 30) {
      category = 'Overweight';
      color = '#f59e0b';
      suggestion = 'Shift toward more fibrous plant-based foods and moderate protein.';
      diet = [
        { meal: 'Fiber Start', menu: 'Smoothie with spinach, protein powder, and flax seeds', cal: '280 kcal' },
        { meal: 'Green Lunch', menu: 'Turkey wrap with lots of greens and whole wheat tortilla', cal: '390 kcal' },
        { meal: 'Veggie Snack', menu: 'Carrot sticks with hummus', cal: '120 kcal' },
        { meal: 'Repair Dinner', menu: 'Lentil soup with a side of sautéed kale', cal: '320 kcal' }
      ];
    } else {
      category = 'Obese';
      color = '#ef4444';
      suggestion = 'Consistency is key. Focus on low-glycemic foods and daily movement.';
      diet = [
        { meal: 'Lean Start', menu: 'Egg white omelet with mushrooms and spinach', cal: '210 kcal' },
        { meal: 'Clean Lunch', menu: 'Tuna salad with mixed greens (no mayo)', cal: '310 kcal' },
        { meal: 'Pure Snack', menu: 'Handful of raw almonds', cal: '160 kcal' },
        { meal: 'End-Day Fuel', menu: 'Grilled white fish with asparagus and zucchini', cal: '290 kcal' }
      ];
    }

    setResult({ bmi, category, color, suggestion, diet });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container" style={{ background: 'var(--bg-body)' }}>
      <Sidebar handleLogout={handleLogout} />

      <main className="main-content" style={{ padding: '0 0 3rem 0', maxWidth: '100%', margin: '0' }}>
        <Navbar userProfile={user} />

        <div style={{ padding: '0 4rem' }}>
          <div className="header-row" style={{ marginBottom: '2.5rem', alignItems: 'flex-start' }}>
            <div className="welcome-section">
              <p className="text-secondary mb-1">Biological Analysis</p>
              <h1 style={{ fontSize: '2.25rem', color: 'var(--text-primary)' }}>Nutrient Roadmap</h1>
            </div>
            <div style={{ color: 'var(--primary)', background: 'var(--primary-light)', padding: '16px', borderRadius: '16px' }}>
              <Utensils size={32} />
            </div>
          </div>

          <div className="dashboard-card mb-8 glass" style={{ 
            padding: 0, 
            overflow: 'hidden', 
            display: 'grid', 
            gridTemplateColumns: '0.45fr 0.55fr',
            minHeight: '320px',
            border: '1px solid white'
          }}>
            <div style={{ 
              backgroundImage: "url('/diet_banner.png')", 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
            }} />
            <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                <Sparkles size={18} />
                <span style={{ fontSize: '0.75rem', fontWeight: '800', uppercase: true, letterSpacing: '0.1em' }}>PRECISION NUTRITION</span>
              </div>
              <h2 className="mb-4" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>Biological Fuel Optimization</h2>
              <p className="text-secondary leading-relaxed max-w-md" style={{ fontSize: '1.125rem' }}>Input your biometric data to synthesize a personalized 30-day nutrition plan generated by our medical intelligence engine.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div className="dashboard-card glass" style={{ border: '1px solid white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <Dna size={24} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Biometric Input</h3>
              </div>
              
              <form onSubmit={calculateBMI}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: '700' }}>Height (cm)</label>
                    <div style={{ position: 'relative' }}>
                      <Ruler size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="number" 
                        className="form-input" 
                        placeholder="175"
                        style={{ paddingLeft: '3.5rem', height: '56px', background: 'var(--bg-soft)', border: '1px solid var(--border-color)' }}
                        value={formData.height}
                        onChange={(e) => setFormData({...formData, height: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: '700' }}>Weight (kg)</label>
                    <div style={{ position: 'relative' }}>
                      <Scale size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="number" 
                        className="form-input" 
                        placeholder="70"
                        style={{ paddingLeft: '3.5rem', height: '56px', background: 'var(--bg-soft)', border: '1px solid var(--border-color)' }}
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: '700' }}>Biological Gender</label>
                    <select 
                      className="form-input" 
                      style={{ height: '56px', background: 'var(--bg-soft)', border: '1px solid var(--border-color)', fontWeight: '600' }}
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Non-Binary</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: '700' }}>Age</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      placeholder="25"
                      style={{ height: '56px', background: 'var(--bg-soft)', border: '1px solid var(--border-color)' }}
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full" style={{ height: '64px', fontSize: '1.125rem', fontWeight: '800' }}>
                  Generate Nutrition Blueprint
                </button>
              </form>
            </div>

            <div className={`dashboard-card ${result ? 'glass' : ''}`} style={{ 
              background: result ? 'white' : 'var(--bg-soft)', 
              border: result ? '1px solid white' : '2px dashed var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '600px'
            }}>
              {!result ? (
                <div className="text-center py-24 text-muted" style={{ margin: 'auto' }}>
                  <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: 'var(--shadow-sm)' }}>
                    <Activity size={32} style={{ color: 'var(--border-color)' }} />
                  </div>
                  <p style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Awaiting Biometric Data...</p>
                </div>
              ) : (
                <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Premium BMI Speedometer */}
                  <div style={{ position: 'relative', width: '340px', height: '200px', margin: '0 auto 2.5rem' }}>
                    <svg viewBox="0 0 200 130" style={{ width: '100%', height: '100%' }}>
                      <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="40%" stopColor="#10b981" />
                          <stop offset="70%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                      
                      {/* Thicker Background Track */}
                      <path 
                        d="M20,110 A80,80 0 0,1 180,110" 
                        fill="none" 
                        stroke="#f1f5f9" 
                        strokeWidth="16" 
                        strokeLinecap="round" 
                      />
                      
                      {/* Gradient Track Overlay */}
                      <path 
                        d="M20,110 A80,80 0 0,1 180,110" 
                        fill="none" 
                        stroke="url(#gaugeGradient)" 
                        strokeWidth="16" 
                        strokeLinecap="round" 
                        opacity="0.8"
                      />

                      {/* Tick Marks */}
                      {[0, 45, 90, 135, 180].map((deg, i) => {
                        const r1 = 82;
                        const r2 = 90;
                        const rad = (deg + 180) * Math.PI / 180;
                        return (
                          <line 
                            key={i}
                            x1={100 + r1 * Math.cos(rad)} 
                            y1={110 + r1 * Math.sin(rad)}
                            x2={100 + r2 * Math.cos(rad)} 
                            y2={110 + r2 * Math.sin(rad)}
                            stroke="#cbd5e1"
                            strokeWidth="2"
                          />
                        );
                      })}
                      
                      {/* Dynamic Needle */}
                      {(() => {
                        const bmiVal = parseFloat(result.bmi);
                        const clampedBmi = Math.min(Math.max(bmiVal, 15), 40);
                        const percentage = (clampedBmi - 15) / (40 - 15);
                        const angle = 180 + (percentage * 180);
                        const radius = 85;
                        const centerX = 100;
                        const centerY = 110;
                        
                        return (
                          <g style={{ transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)', transformOrigin: '100px 110px' }}>
                            <line 
                              x1={centerX} 
                              y1={centerY} 
                              x2={centerX + radius * Math.cos(angle * Math.PI / 180)} 
                              y2={centerY + radius * Math.sin(angle * Math.PI / 180)}
                              stroke="var(--text-primary)" 
                              strokeWidth="4" 
                              strokeLinecap="round"
                            />
                            <circle cx="100" cy="110" r="8" fill="var(--text-primary)" />
                            <circle cx="100" cy="110" r="4" fill="white" />
                          </g>
                        );
                      })()}
                    </svg>
                    
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '-1rem', 
                      left: '0', 
                      right: '0', 
                      textAlign: 'center' 
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0, letterSpacing: '-2px' }}>{result.bmi}</h2>
                        <div style={{ 
                          padding: '0.4rem 1.25rem', 
                          borderRadius: '100px', 
                          background: result.color, 
                          color: 'white', 
                          fontWeight: '800', 
                          fontSize: '0.875rem', 
                          textTransform: 'uppercase',
                          marginTop: '0.25rem',
                          boxShadow: `0 8px 16px ${result.color}44`
                        }}>
                          {result.category}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    background: 'var(--bg-soft)', 
                    padding: '1.25rem', 
                    borderRadius: '16px', 
                    marginBottom: '2rem', 
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    marginTop: '1rem'
                  }}>
                    <TrendingUp size={20} style={{ color: result.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{result.suggestion}</span>
                  </div>

                  <div style={{ display: 'grid', gap: '1rem', flex: 1 }}>
                    {result.diet.map((item, i) => (
                      <div key={i} style={{ 
                        padding: '1.5rem', 
                        background: 'white', 
                        borderRadius: '18px', 
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s ease',
                        cursor: 'pointer'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                          <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {i === 0 ? <Apple size={22} /> : i === 1 ? <Utensils size={22} /> : i === 2 ? <Flame size={22} /> : <Apple size={22} />}
                          </div>
                          <div>
                            <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.meal}</p>
                            <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{item.menu}</p>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                           <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)' }}>{item.cal}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DietPlanner;
