/* =============================================
   GATE 2027 ECE STUDY COMPANION — app.js
   ============================================= */

/* ─── SVG Gradient patch ─── */
document.addEventListener('DOMContentLoaded', () => {
  const svgDef = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgDef.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  svgDef.innerHTML = `<defs>
    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#6c63ff"/>
      <stop offset="100%" style="stop-color:#00d9ff"/>
    </linearGradient>
  </defs>`;
  document.body.prepend(svgDef);
  initApp();
});

/* =============================================
   DATA — ECE Subjects & Topics
   ============================================= */
const SUBJECTS = [
  {
    id: 'math', name: 'Engineering Mathematics', weight: 'high', marks: 13, color: '#6c63ff',
    topics: [
      {
        id: 'la', title: 'Linear Algebra',
        subtopics: [
          { id: 'mat', title: 'Matrix Algebra', subsubtopics: ['Types of matrices', 'Matrix operations', 'Rank of a matrix', 'Determinants and properties', 'Inverse of a matrix'] },
          { id: 'sys', title: 'Linear Equations', subsubtopics: ['Consistency of linear systems', 'Cramer\'s rule', 'Gaussian elimination'] },
          { id: 'eig', title: 'Eigenvalues & Eigenvectors', subsubtopics: ['Characteristic equation', 'Cayley-Hamilton Theorem', 'Diagonalization', 'Orthogonal & Unitary matrices'] }
        ]
      },
      {
        id: 'calc', title: 'Calculus',
        subtopics: [
          { id: 'diff', title: 'Differential Calculus', subsubtopics: ['Limits, continuity, differentiability', 'Mean value theorems', 'Maxima and minima', 'Partial derivatives', 'Taylor and Maclaurin series'] },
          { id: 'int', title: 'Integral Calculus', subsubtopics: ['Definite and improper integrals', 'Multiple integrals (double & triple)', 'Change of order of integration', 'Area and volume'] },
          { id: 'vec', title: 'Vector Calculus', subsubtopics: ['Gradient, Divergence, Curl', 'Line, surface, and volume integrals', 'Gauss, Stokes, and Green\'s theorems'] }
        ]
      },
      {
        id: 'de', title: 'Differential Equations',
        subtopics: [
          { id: 'ode', title: 'Ordinary Differential Equations', subsubtopics: ['First order (linear and non-linear)', 'Higher order linear ODEs with constant coefficients', 'Euler-Cauchy equation', 'Initial and boundary value problems'] },
          { id: 'pde', title: 'Partial Differential Equations', subsubtopics: ['First order PDEs', 'Method of separation of variables', 'One-dimensional heat and wave equations'] }
        ]
      },
      {
        id: 'ca', title: 'Complex Analysis',
        subtopics: [
          { id: 'fun', title: 'Complex Variables', subsubtopics: ['Analytic functions', 'Cauchy-Riemann equations', 'Harmonic functions'] },
          { id: 'int2', title: 'Complex Integration', subsubtopics: ['Cauchy\'s integral theorem', 'Cauchy\'s integral formula', 'Taylor & Laurent series', 'Residue theorem'] }
        ]
      },
      {
        id: 'prob', title: 'Probability & Statistics',
        subtopics: [
          { id: 'bas', title: 'Probability Basics', subsubtopics: ['Conditional probability', 'Bayes\' Theorem', 'Random variables (discrete and continuous)'] },
          { id: 'dist', title: 'Distributions', subsubtopics: ['Mean, variance, median, mode', 'Binomial distribution', 'Poisson distribution', 'Normal and Exponential distributions'] }
        ]
      }
    ]
  },
  {
    id: 'networks', name: 'Network Theory', weight: 'high', marks: 7, color: '#00d9ff',
    topics: [
      {
        id: 'basics', title: 'Network Basics',
        subtopics: [
          { id: 'k', title: 'Circuit Laws', subsubtopics: ['KVL and KCL', 'Nodal and Mesh analysis', 'Network topology (Graph theory, Trees, Cut-sets)'] },
          { id: 'th', title: 'Network Theorems', subsubtopics: ['Superposition theorem', 'Thevenin and Norton theorems', 'Maximum power transfer theorem', 'Wye-Delta transformation'] }
        ]
      },
      {
        id: 'trans', title: 'Transient Analysis',
        subtopics: [
          { id: 'rc', title: 'RC/RL Circuits', subsubtopics: ['First-order circuits (DC and AC)', 'Initial conditions', 'Time constants'] },
          { id: 'rlc', title: 'RLC Circuits', subsubtopics: ['Second-order systems', 'Overdamped, underdamped, critically damped response'] }
        ]
      },
      {
        id: 'ac', title: 'Steady State AC Analysis',
        subtopics: [
          { id: 'phasors', title: 'Sinusoidal Steady State', subsubtopics: ['Phasors', 'Impedance and Admittance', 'Real, Reactive, Apparent Power', 'Power factor'] },
          { id: 'res', title: 'Resonance', subsubtopics: ['Series resonance', 'Parallel resonance', 'Q-factor and Bandwidth'] }
        ]
      },
      {
        id: 'tp', title: 'Two-Port Networks',
        subtopics: [
          { id: 'param', title: 'Parameters', subsubtopics: ['Z, Y, h, and ABCD parameters', 'Interconnections of two-port networks', 'Reciprocity and Symmetry conditions'] }
        ]
      }
    ]
  },
  {
    id: 'devices', name: 'Electronic Devices', weight: 'high', marks: 8, color: '#ff8c42',
    topics: [
      {
        id: 'sc', title: 'Semiconductor Physics',
        subtopics: [
          { id: 'band', title: 'Energy Bands', subsubtopics: ['Energy bands in silicon, intrinsic and extrinsic silicon', 'Carrier transport (drift and diffusion current)', 'Mobility and resistivity'] },
          { id: 'gen', title: 'Generation & Recombination', subsubtopics: ['Carrier generation and recombination', 'Poisson and continuity equations', 'Hall effect'] }
        ]
      },
      {
        id: 'pn', title: 'PN Junction & Diodes',
        subtopics: [
          { id: 'junc', title: 'PN Junction', subsubtopics: ['Depletion region, built-in potential', 'I-V characteristics, diode equation', 'Junction and diffusion capacitance'] },
          { id: 'special', title: 'Special Diodes', subsubtopics: ['Zener diode (breakdown mechanisms)', 'Tunnel diode', 'Varactor diode'] }
        ]
      },
      {
        id: 'bjt', title: 'Bipolar Junction Transistor',
        subtopics: [
          { id: 'bjt_op', title: 'BJT Operation', subsubtopics: ['NPN and PNP basics', 'Early effect', 'Ebers-Moll model', 'I-V characteristics'] }
        ]
      },
      {
        id: 'mos', title: 'MOSFET',
        subtopics: [
          { id: 'mos_cap', title: 'MOS Capacitor', subsubtopics: ['C-V characteristics', 'Accumulation, depletion, inversion'] },
          { id: 'mos_fet', title: 'MOSFET Operation', subsubtopics: ['I-V characteristics', 'Threshold voltage', 'Channel length modulation', 'CMOS basics'] }
        ]
      },
      {
        id: 'opto', title: 'Optoelectronics',
        subtopics: [
          { id: 'light', title: 'Optical Devices', subsubtopics: ['LEDs', 'Photo-diodes (PIN, Avalanche)', 'Solar cells'] }
        ]
      }
    ]
  },
  {
    id: 'analog', name: 'Analog Circuits', weight: 'high', marks: 8, color: '#ff4d6d',
    topics: [
      {
        id: 'dcirc', title: 'Diode Circuits',
        subtopics: [
          { id: 'rect', title: 'Rectifiers & Filters', subsubtopics: ['Half-wave and Full-wave rectifiers', 'Capacitor filters', 'Ripple factor'] },
          { id: 'clip', title: 'Clippers & Clampers', subsubtopics: ['Series/Parallel clippers', 'Clamping circuits', 'Voltage multipliers'] }
        ]
      },
      {
        id: 'bjtamp', title: 'BJT Amplifiers',
        subtopics: [
          { id: 'bias', title: 'Biasing', subsubtopics: ['DC load line', 'Operating point', 'Thermal stability'] },
          { id: 'small', title: 'Small Signal Analysis', subsubtopics: ['CE, CB, CC configurations', 'h-parameter and pi-models', 'Gain, input/output impedance'] }
        ]
      },
      {
        id: 'mosamp', title: 'MOSFET Amplifiers',
        subtopics: [
          { id: 'mos_bias', title: 'MOS Biasing & Amplifiers', subsubtopics: ['CS, CG, CD configurations', 'Current mirrors', 'Active loads'] }
        ]
      },
      {
        id: 'freq', title: 'Frequency Response',
        subtopics: [
          { id: 'hf', title: 'High & Low Frequency', subsubtopics: ['Miller effect', 'High-frequency equivalent circuits (BJT/MOSFET)', 'Cutoff frequencies'] }
        ]
      },
      {
        id: 'opamp', title: 'Operational Amplifiers',
        subtopics: [
          { id: 'ideal', title: 'Linear Applications', subsubtopics: ['Ideal Op-Amp', 'Inverting/Non-inverting amps', 'Integrator, Differentiator', 'Instrumentation amplifier', 'Active filters'] },
          { id: 'nonlin', title: 'Non-Linear Applications', subsubtopics: ['Comparators', 'Schmitt trigger', 'Precision rectifiers', 'Log/Antilog amplifiers'] }
        ]
      },
      {
        id: 'osc', title: 'Oscillators & Timers',
        subtopics: [
          { id: 'fb', title: 'Feedback & Oscillators', subsubtopics: ['Barkhausen criterion', 'RC phase shift, Wien bridge', 'Hartley, Colpitts oscillators'] },
          { id: 'timer', title: '555 Timer', subsubtopics: ['Astable multivibrator', 'Monostable multivibrator'] }
        ]
      }
    ]
  },
  {
    id: 'digital', name: 'Digital Circuits', weight: 'high', marks: 7, color: '#ffd166',
    topics: [
      {
        id: 'bool', title: 'Boolean Algebra',
        subtopics: [
          { id: 'logic', title: 'Logic Gates & Minimization', subsubtopics: ['Logic gates, Universal gates', 'Boolean theorems', 'K-maps (up to 4 variables)', 'SOP and POS forms'] }
        ]
      },
      {
        id: 'comb', title: 'Combinational Logic',
        subtopics: [
          { id: 'arith', title: 'Arithmetic Circuits', subsubtopics: ['Half/Full adders and subtractors', 'Look-ahead carry adder'] },
          { id: 'mux', title: 'MUX & Encoders', subsubtopics: ['Multiplexers and Demultiplexers', 'Encoders and Decoders', 'Implementing logic using MUX'] }
        ]
      },
      {
        id: 'seq', title: 'Sequential Logic',
        subtopics: [
          { id: 'ff', title: 'Flip-Flops', subsubtopics: ['SR, JK, D, T flip-flops', 'Excitation tables', 'Setup and Hold times'] },
          { id: 'reg', title: 'Registers & Counters', subsubtopics: ['Shift registers', 'Ripple counters', 'Synchronous counters', 'Ring and Johnson counters'] }
        ]
      },
      {
        id: 'adc', title: 'Data Converters',
        subtopics: [
          { id: 'dac_adc', title: 'ADC & DAC', subsubtopics: ['Sample and hold circuits', 'DAC (R-2R, Weighted resistor)', 'ADC (Flash, SAR, Dual slope)', 'Resolution and Quantization error'] }
        ]
      },
      {
        id: 'mem', title: 'Semiconductor Memories',
        subtopics: [
          { id: 'rom_ram', title: 'Memory Architecture', subsubtopics: ['ROM, SRAM, DRAM basics', 'Memory expansion'] }
        ]
      }
    ]
  },
  {
    id: 'signals', name: 'Signals & Systems', weight: 'high', marks: 9, color: '#00e5a0',
    topics: [
      {
        id: 'sig', title: 'Signals Basics',
        subtopics: [
          { id: 'cts_dts', title: 'Signal Types', subsubtopics: ['Continuous and Discrete time signals', 'Periodic/Aperiodic, Energy/Power signals', 'Standard signals (Step, Impulse, Ramp)', 'Signal operations (shift, scale, fold)'] }
        ]
      },
      {
        id: 'sys', title: 'Systems Basics',
        subtopics: [
          { id: 'lti', title: 'LTI Systems', subsubtopics: ['Linearity, Time-invariance, Causality, Stability', 'Convolution integral and sum', 'Impulse response'] }
        ]
      },
      {
        id: 'ft', title: 'Fourier Series & Transform',
        subtopics: [
          { id: 'fs', title: 'Fourier Series', subsubtopics: ['Trigonometric and Exponential FS', 'Properties of FS', 'Parseval\'s theorem'] },
          { id: 'ctft', title: 'Continuous Fourier Transform', subsubtopics: ['Properties of CTFT', 'Magnitude and Phase spectra'] }
        ]
      },
      {
        id: 'lap', title: 'Laplace Transform',
        subtopics: [
          { id: 'lt', title: 'LT Properties', subsubtopics: ['ROC properties', 'Inverse Laplace transform', 'System transfer function and stability'] }
        ]
      },
      {
        id: 'zt', title: 'Z-Transform & DTFT',
        subtopics: [
          { id: 'z', title: 'Z-Transform', subsubtopics: ['ROC and properties', 'Inverse Z-Transform', 'Difference equations'] },
          { id: 'dtft', title: 'DTFT & DFT', subsubtopics: ['Discrete Time Fourier Transform', 'Discrete Fourier Transform (DFT)', 'FFT basics (Radix-2)'] }
        ]
      },
      {
        id: 'samp', title: 'Sampling',
        subtopics: [
          { id: 'nyquist', title: 'Sampling Theorem', subsubtopics: ['Nyquist rate', 'Aliasing and anti-aliasing filter', 'Ideal and flat-top sampling'] }
        ]
      }
    ]
  },
  {
    id: 'control', name: 'Control Systems', weight: 'high', marks: 9, color: '#9b59b6',
    topics: [
      {
        id: 'mod', title: 'Modeling',
        subtopics: [
          { id: 'tf', title: 'Transfer Functions', subsubtopics: ['Open/Closed loop systems', 'Block diagram reduction', 'Signal Flow Graphs and Mason\'s Gain Formula'] }
        ]
      },
      {
        id: 'time', title: 'Time Domain Analysis',
        subtopics: [
          { id: 'trans_resp', title: 'Transient & Steady State', subsubtopics: ['First and Second order systems (step response)', 'Time domain specifications (Delay, Rise, Peak, Settling time)', 'Steady state errors and error constants (Type 0,1,2)'] }
        ]
      },
      {
        id: 'stab', title: 'Stability Analysis',
        subtopics: [
          { id: 'rh', title: 'Routh-Hurwitz', subsubtopics: ['Characteristic equation', 'Routh array', 'Absolute and marginal stability'] },
          { id: 'rl', title: 'Root Locus', subsubtopics: ['Root locus construction rules', 'Effect of adding poles and zeros'] }
        ]
      },
      {
        id: 'freq_resp', title: 'Frequency Domain Analysis',
        subtopics: [
          { id: 'bode', title: 'Bode & Nyquist', subsubtopics: ['Bode plots', 'Gain Margin and Phase Margin', 'Polar plots and Nyquist stability criterion'] }
        ]
      },
      {
        id: 'comp', title: 'Compensators & Controllers',
        subtopics: [
          { id: 'pid', title: 'Design', subsubtopics: ['Lead, Lag, Lead-Lag compensators', 'P, PI, PID controllers'] }
        ]
      },
      {
        id: 'ss', title: 'State Space Analysis',
        subtopics: [
          { id: 'state', title: 'State Variables', subsubtopics: ['State space model', 'State transition matrix', 'Controllability and Observability'] }
        ]
      }
    ]
  },
  {
    id: 'comms', name: 'Communications', weight: 'high', marks: 10, color: '#e74c3c',
    topics: [
      {
        id: 'rand', title: 'Random Processes',
        subtopics: [
          { id: 'noise', title: 'Noise & RVs', subsubtopics: ['Random variables (PDF, CDF, Moments)', 'Autocorrelation and Power Spectral Density (PSD)', 'White noise, Narrowband noise', 'Gaussian and Rayleigh distributions'] }
        ]
      },
      {
        id: 'analog_comm', title: 'Analog Communications',
        subtopics: [
          { id: 'am', title: 'Amplitude Modulation', subsubtopics: ['DSB-FC (AM), DSB-SC, SSB, VSB', 'Modulators and Demodulators (Envelope detector)', 'Superheterodyne receivers'] },
          { id: 'fm', title: 'Angle Modulation', subsubtopics: ['FM and PM', 'Bandwidth of FM (Carson\'s rule)', 'Generation and Detection of FM', 'Pre-emphasis and De-emphasis'] },
          { id: 'snr', title: 'Noise in Analog Comm', subsubtopics: ['SNR calculations for AM and FM', 'Figure of Merit'] }
        ]
      },
      {
        id: 'dig_comm', title: 'Digital Communications',
        subtopics: [
          { id: 'baseband', title: 'Baseband Transmission', subsubtopics: ['Sampling, Quantization (Uniform/Non-uniform)', 'PCM, DPCM, Delta Modulation', 'Line coding (NRZ, RZ, Manchester)', 'Intersymbol Interference (ISI) and Nyquist criterion', 'Matched filter'] },
          { id: 'bandpass', title: 'Digital Modulation', subsubtopics: ['ASK, FSK, PSK (BPSK, QPSK)', 'QAM', 'Probability of error (BER) calculations', 'Constellation diagrams'] }
        ]
      },
      {
        id: 'info', title: 'Information Theory',
        subtopics: [
          { id: 'cap', title: 'Entropy & Capacity', subsubtopics: ['Entropy and Mutual Information', 'Shannon-Hartley theorem', 'Channel capacity', 'Source coding (Huffman)', 'Error control coding basics (Hamming codes)'] }
        ]
      }
    ]
  },
  {
    id: 'em', name: 'Electromagnetics', weight: 'med', marks: 8, color: '#3498db',
    topics: [
      {
        id: 'vec_em', title: 'Vector Calculus in EM',
        subtopics: [
          { id: 'coord', title: 'Coordinate Systems', subsubtopics: ['Cartesian, Cylindrical, Spherical systems', 'Divergence and Curl theorems'] }
        ]
      },
      {
        id: 'stat', title: 'Electro/Magnetostatics',
        subtopics: [
          { id: 'efield', title: 'Electrostatics', subsubtopics: ['Coulomb\'s Law, Gauss\'s Law', 'Electric field and potential', 'Boundary conditions', 'Capacitance'] },
          { id: 'mfield', title: 'Magnetostatics', subsubtopics: ['Biot-Savart Law, Ampere\'s Law', 'Magnetic boundary conditions', 'Inductance'] }
        ]
      },
      {
        id: 'max', title: 'Maxwell\'s Equations',
        subtopics: [
          { id: 'time_var', title: 'Time-Varying Fields', subsubtopics: ['Faraday\'s Law', 'Displacement current', 'Differential and integral forms of Maxwell\'s equations'] }
        ]
      },
      {
        id: 'wave', title: 'Plane Waves',
        subtopics: [
          { id: 'prop', title: 'Wave Propagation', subsubtopics: ['Wave equation', 'Propagation in free space, dielectrics, conductors', 'Skin depth', 'Poynting vector', 'Reflection and refraction, Polarization'] }
        ]
      },
      {
        id: 'tl', title: 'Transmission Lines',
        subtopics: [
          { id: 'tline', title: 'TL Equations', subsubtopics: ['Characteristic impedance, Propagation constant', 'Reflection coefficient, VSWR', 'Impedance matching, Quarter-wave transformer', 'Smith Chart basics'] }
        ]
      },
      {
        id: 'wg', title: 'Waveguides & Antennas',
        subtopics: [
          { id: 'guides', title: 'Waveguides', subsubtopics: ['Rectangular waveguides', 'TE and TM modes', 'Cut-off frequency and phase velocity'] },
          { id: 'ant', title: 'Antennas', subsubtopics: ['Antenna parameters (Gain, Directivity, Radiation pattern)', 'Dipole antennas (Half-wave)'] }
        ]
      }
    ]
  },
  {
    id: 'micro', name: 'Microprocessors', weight: 'med', marks: 5, color: '#27ae60',
    topics: [
      {
        id: 'arch', title: '8085 Microprocessor',
        subtopics: [
          { id: '8085', title: 'Architecture & Programming', subsubtopics: ['ALU, Registers, Timing diagram', 'Instruction set and Addressing modes', 'Assembly language programming'] }
        ]
      },
      {
        id: 'inter', title: 'Interfacing',
        subtopics: [
          { id: 'io', title: 'Memory & I/O', subsubtopics: ['Memory mapping and interfacing', 'Interrupts (Hardware and Software)'] }
        ]
      }
    ]
  },
  {
    id: 'apt', name: 'General Aptitude', weight: 'high', marks: 15, color: '#f39c12',
    topics: [
      {
        id: 'quant', title: 'Quantitative Aptitude',
        subtopics: [
          { id: 'num', title: 'Numbers & Arithmetic', subsubtopics: ['Fractions, Decimals, Percentages', 'Profit, Loss, Interest', 'Time, Work, Distance', 'Ratio, Proportion, Mixtures'] },
          { id: 'geom', title: 'Geometry & Data', subsubtopics: ['Mensuration', 'Data Interpretation (Graphs, Charts)'] }
        ]
      },
      {
        id: 'reason', title: 'Analytical & Spatial',
        subtopics: [
          { id: 'logic_apt', title: 'Reasoning', subsubtopics: ['Syllogisms, Blood relations', 'Series, Coding-decoding', 'Spatial aptitude (Paper folding, Mirror images)'] }
        ]
      },
      {
        id: 'verb', title: 'Verbal Ability',
        subtopics: [
          { id: 'eng', title: 'English Grammar', subsubtopics: ['Vocabulary, Synonyms, Antonyms', 'Sentence completion', 'Reading comprehension'] }
        ]
      }
    ]
  }
];

/* =============================================
   DATA — Formula Bank
   ============================================= */
const FORMULAS = [
  // ─── ENGINEERING MATHEMATICS ───
  { id: 1, subject: 'math', name: 'Euler\'s Formula', expr: 'e^(jθ) = cosθ + j·sinθ', desc: 'Foundation of phasor analysis and Fourier transforms' },
  { id: 2, subject: 'math', name: 'Bayes\' Theorem', expr: 'P(A|B) = P(B|A)·P(A) / P(B)', desc: 'Conditional probability — appears in communications' },
  { id: 3, subject: 'math', name: 'Eigenvalue Equation', expr: 'Av = λv', desc: 'A = matrix, v = eigenvector, λ = eigenvalue' },
  { id: 4, subject: 'math', name: 'Taylor Series', expr: 'f(x) = Σ f⁽ⁿ⁾(a)/n! · (x-a)ⁿ', desc: 'Approximation of functions around point a' },
  { id: 5, subject: 'math', name: 'Cayley-Hamilton', expr: 'A satisfies its own characteristic equation', desc: 'Every square matrix satisfies p(A) = 0' },
  { id: 6, subject: 'math', name: 'Rank-Nullity', expr: 'rank(A) + nullity(A) = n', desc: 'n = number of columns of A' },
  { id: 7, subject: 'math', name: 'Variance', expr: 'Var(X) = E[X²] − (E[X])²', desc: 'Shortcut formula for variance computation' },
  { id: 8, subject: 'math', name: 'Gaussian PDF', expr: 'f(x) = (1/σ√2π) e^(-(x-μ)²/2σ²)', desc: 'Normal distribution probability density function' },
  { id: 9, subject: 'math', name: 'Laplace Transform', expr: 'L{f(t)} = ∫₀^∞ f(t)·e^(-st)dt', desc: 'Converts time domain to s-domain' },
  { id: 10, subject: 'math', name: 'Inverse Laplace', expr: 'L⁻¹{1/(s+a)} = e^(-at)·u(t)', desc: 'Basic inverse Laplace transform pair' },
  { id: 11, subject: 'math', name: 'Residue Theorem', expr: '∮f(z)dz = 2πj Σ Res(f, zₖ)', desc: 'Contour integral equals 2πj times sum of residues' },
  { id: 12, subject: 'math', name: 'Cauchy-Riemann', expr: '∂u/∂x = ∂v/∂y, ∂u/∂y = -∂v/∂x', desc: 'Conditions for f(z) = u + jv to be analytic' },
  { id: 13, subject: 'math', name: 'Newton-Raphson', expr: 'xₙ₊₁ = xₙ - f(xₙ)/f\'(xₙ)', desc: 'Iterative root finding method' },
  { id: 14, subject: 'math', name: 'Trapezoidal Rule', expr: '∫f(x)dx ≈ h/2 [f(x₀) + 2Σf(xᵢ) + f(xₙ)]', desc: 'Numerical integration with h = step size' },
  { id: 15, subject: 'math', name: 'Divergence Theorem', expr: '∮F·dS = ∫∫∫(∇·F)dV', desc: 'Surface integral to volume integral conversion' },
  { id: 16, subject: 'math', name: 'Stokes\' Theorem', expr: '∮F·dl = ∬(∇×F)·dS', desc: 'Line integral to surface integral conversion' },

  // ─── NETWORK THEORY ───
  { id: 17, subject: 'networks', name: 'Thevenin Equivalent', expr: 'V_th = V_oc, R_th = V_oc/I_sc', desc: 'Open-circuit voltage and short-circuit current' },
  { id: 18, subject: 'networks', name: 'RLC Resonance', expr: 'ω₀ = 1/√(LC), Q = ω₀L/R', desc: 'Series resonant frequency and quality factor' },
  { id: 19, subject: 'networks', name: 'Time Constant (RC)', expr: 'τ = RC, v(t) = V(1 - e^(-t/τ))', desc: 'Charging voltage of capacitor' },
  { id: 20, subject: 'networks', name: 'Max Power Transfer', expr: 'R_L = R_th, P_max = V_th² / 4R_th', desc: 'Condition for maximum power delivered to load' },
  { id: 21, subject: 'networks', name: 'Time Constant (RL)', expr: 'τ = L/R, i(t) = I(1 - e^(-t/τ))', desc: 'Current rise in inductor circuit' },
  { id: 22, subject: 'networks', name: 'Norton Equivalent', expr: 'I_N = I_sc, R_N = R_th', desc: 'Short-circuit current & equiv. resistance' },
  { id: 23, subject: 'networks', name: 'Parallel RLC Q', expr: 'Q = R·√(C/L) = R/(ω₀L)', desc: 'Quality factor for parallel resonance' },
  { id: 24, subject: 'networks', name: 'Superposition', expr: 'V_total = ΣVᵢ (one source at a time)', desc: 'Linear circuits only; voltage sources → 0V, current → open' },
  { id: 25, subject: 'networks', name: 'Two-Port: ABCD', expr: '[V₁; I₁] = [A B; C D][V₂; -I₂]', desc: 'Cascade connection → multiply ABCD matrices' },
  { id: 26, subject: 'networks', name: 'Two-Port: Z-params', expr: 'V₁ = Z₁₁I₁ + Z₁₂I₂', desc: 'Open-circuit impedance parameters' },
  { id: 27, subject: 'networks', name: 'Reciprocity', expr: 'Z₁₂ = Z₂₁ (reciprocal network)', desc: 'For networks with no dependent sources' },
  { id: 28, subject: 'networks', name: 'Impedance (Inductor)', expr: 'Z_L = jωL', desc: 'Inductor impedance in frequency domain' },
  { id: 29, subject: 'networks', name: 'Impedance (Capacitor)', expr: 'Z_C = 1/(jωC)', desc: 'Capacitor impedance in frequency domain' },

  // ─── ELECTRONIC DEVICES ───
  { id: 30, subject: 'devices', name: 'Diode Current', expr: 'I = I₀(e^(V/ηV_T) - 1)', desc: 'η = ideality factor, V_T = kT/q ≈ 26mV at 300K' },
  { id: 31, subject: 'devices', name: 'MOSFET (Saturation)', expr: 'I_D = (μₙCₒₓW/2L)(V_GS - V_th)²', desc: 'Drain current in saturation region' },
  { id: 32, subject: 'devices', name: 'BJT (Active)', expr: 'I_C = β·I_B = α·I_E', desc: 'β = current gain (CE), α = β/(1+β) (CB)' },
  { id: 33, subject: 'devices', name: 'Built-in Potential', expr: 'V_bi = (kT/q)·ln(N_A·N_D/nᵢ²)', desc: 'PN junction contact potential' },
  { id: 34, subject: 'devices', name: 'Depletion Width', expr: 'W = √(2ε(V_bi+V_R)(1/N_A+1/N_D)/q)', desc: 'Total depletion width of PN junction' },
  { id: 35, subject: 'devices', name: 'Junction Capacitance', expr: 'C_j = C_j0 / (1 + V_R/V_bi)^m', desc: 'm = 1/2 (abrupt), 1/3 (graded junction)' },
  { id: 36, subject: 'devices', name: 'Drift Current', expr: 'J_drift = σE = (nμₙ + pμₚ)qE', desc: 'σ = conductivity, E = electric field' },
  { id: 37, subject: 'devices', name: 'Diffusion Current', expr: 'J_diff = qDₙ(dn/dx)', desc: 'D = diffusion coefficient; Einstein: D = μ·kT/q' },
  { id: 38, subject: 'devices', name: 'MOSFET (Linear)', expr: 'I_D = μₙCₒₓ(W/L)[(V_GS-V_th)V_DS - V_DS²/2]', desc: 'Drain current in linear/triode region' },
  { id: 39, subject: 'devices', name: 'Intrinsic Carrier', expr: 'nᵢ² = n·p (mass action law)', desc: 'Product of electron and hole concentrations' },
  { id: 40, subject: 'devices', name: 'Fermi Level', expr: 'n = nᵢ·e^((E_F-E_i)/kT)', desc: 'Carrier concentration from Fermi level position' },
  { id: 41, subject: 'devices', name: 'Threshold Voltage', expr: 'V_th = V_FB + 2φ_F + √(4εₛqNₐφ_F)/Cₒₓ', desc: 'MOSFET threshold voltage with body effect' },

  // ─── ANALOG CIRCUITS ───
  { id: 42, subject: 'analog', name: 'Op-Amp Inverting', expr: 'V_out = -(R_f/R_in)·V_in', desc: 'Closed-loop gain of inverting amplifier' },
  { id: 43, subject: 'analog', name: 'Op-Amp Non-Inverting', expr: 'V_out = (1 + R_f/R₁)·V_in', desc: 'Closed-loop gain of non-inverting configuration' },
  { id: 44, subject: 'analog', name: 'Barkhausen Criterion', expr: '|Aβ| = 1, ∠Aβ = 0° or 360°', desc: 'Condition for sustained oscillation' },
  { id: 45, subject: 'analog', name: 'CMRR (dB)', expr: 'CMRR = 20·log₁₀(A_d/A_cm)', desc: 'Differential to common-mode gain ratio' },
  { id: 46, subject: 'analog', name: 'CE Voltage Gain', expr: 'A_v = -g_m(R_C ∥ r_o)', desc: 'g_m = I_C/V_T, r_o = V_A/I_C' },
  { id: 47, subject: 'analog', name: 'Transconductance', expr: 'g_m = I_C/V_T (BJT), g_m = 2I_D/(V_GS-V_th) (MOS)', desc: 'Small-signal transconductance' },
  { id: 48, subject: 'analog', name: 'Feedback Gain', expr: 'A_f = A/(1 + Aβ)', desc: 'Closed-loop gain with feedback factor β' },
  { id: 49, subject: 'analog', name: 'GBP (Op-Amp)', expr: 'GBP = A₀ · f_3dB = constant', desc: 'Gain-bandwidth product is constant for single-pole' },
  { id: 50, subject: 'analog', name: 'Slew Rate', expr: 'SR = dV_out/dt |_max (V/μs)', desc: 'Maximum rate of output voltage change' },
  { id: 51, subject: 'analog', name: 'Input Resistance (CE)', expr: 'r_π = β/g_m = βV_T/I_C', desc: 'Small-signal input resistance of CE stage' },
  { id: 52, subject: 'analog', name: 'Colpitts Oscillator', expr: 'f₀ = 1/(2π√(L·C₁C₂/(C₁+C₂)))', desc: 'Oscillation frequency with capacitive divider feedback' },
  { id: 53, subject: 'analog', name: 'Wien Bridge Oscillator', expr: 'f₀ = 1/(2πRC), gain ≥ 3', desc: 'RC oscillator using positive feedback' },
  { id: 54, subject: 'analog', name: 'Diff Amp Gain', expr: 'A_d = g_m·R_D, A_cm ≈ -R_D/(2R_SS)', desc: 'Differential and common-mode gain of MOS diff pair' },

  // ─── DIGITAL CIRCUITS ───
  { id: 55, subject: 'digital', name: 'SOP (Sum of Products)', expr: 'f = Σm(minterms)', desc: 'Canonical form using 1-minterms' },
  { id: 56, subject: 'digital', name: 'D Flip-Flop', expr: 'Q(t+1) = D', desc: 'Output follows input on clock edge' },
  { id: 57, subject: 'digital', name: 'JK Flip-Flop', expr: 'Q(t+1) = J·Q\' + K\'·Q', desc: 'J=1,K=1 → toggle; J=0,K=0 → hold' },
  { id: 58, subject: 'digital', name: 'De Morgan\'s Law', expr: '(A·B)\' = A\'+B\', (A+B)\' = A\'·B\'', desc: 'AND↔OR duality with complement' },
  { id: 59, subject: 'digital', name: 'T Flip-Flop', expr: 'Q(t+1) = T⊕Q', desc: 'T=1 → toggle, T=0 → hold' },
  { id: 60, subject: 'digital', name: 'Counter Modulus', expr: 'MOD-N: N = 2ⁿ (for n flip-flops)', desc: 'Ripple counter counts from 0 to N-1' },
  { id: 61, subject: 'digital', name: 'ADC Resolution', expr: 'Resolution = V_ref / (2ⁿ - 1)', desc: 'n = number of bits in ADC' },
  { id: 62, subject: 'digital', name: 'DAC Output', expr: 'V_out = V_ref × D / 2ⁿ', desc: 'D = digital input value, n = bits' },
  { id: 63, subject: 'digital', name: 'Shannon Expansion', expr: 'f = x·f(x=1) + x\'·f(x=0)', desc: 'Decomposition of Boolean function around variable x' },
  { id: 64, subject: 'digital', name: 'Min States (FSM)', expr: 'Distinguish equivalent states via implication table', desc: 'State minimization for sequential circuits' },

  // ─── SIGNALS & SYSTEMS ───
  { id: 65, subject: 'signals', name: 'Convolution', expr: 'y(t) = x(t)*h(t) = ∫x(τ)h(t-τ)dτ', desc: 'Output of LTI system given input and impulse response' },
  { id: 66, subject: 'signals', name: 'Fourier Transform', expr: 'X(f) = ∫x(t)·e^(-j2πft)dt', desc: 'Time to frequency domain conversion' },
  { id: 67, subject: 'signals', name: 'Parseval\'s Theorem', expr: '∫|x(t)|²dt = ∫|X(f)|²df', desc: 'Energy conservation in time and frequency domains' },
  { id: 68, subject: 'signals', name: 'Sampling Theorem', expr: 'f_s ≥ 2·f_max (Nyquist Rate)', desc: 'Minimum sampling rate to avoid aliasing' },
  { id: 69, subject: 'signals', name: 'Z-Transform', expr: 'X(z) = Σ x[n]·z⁻ⁿ', desc: 'Discrete-time signal representation' },
  { id: 70, subject: 'signals', name: 'DTFT', expr: 'X(e^jω) = Σ x[n]·e^(-jωn)', desc: 'Discrete-time Fourier transform (periodic in 2π)' },
  { id: 71, subject: 'signals', name: 'DFT', expr: 'X[k] = Σ x[n]·e^(-j2πkn/N)', desc: 'N-point discrete Fourier transform' },
  { id: 72, subject: 'signals', name: 'Fourier Series', expr: 'x(t) = a₀/2 + Σ(aₙcos(nω₀t) + bₙsin(nω₀t))', desc: 'Periodic signal representation; T₀ = 2π/ω₀' },
  { id: 73, subject: 'signals', name: 'Time Shift (LT)', expr: 'L{f(t-a)u(t-a)} = e^(-as)F(s)', desc: 'Laplace transform time shifting property' },
  { id: 74, subject: 'signals', name: 'Convolution (Z)', expr: 'Z{x[n]*h[n]} = X(z)·H(z)', desc: 'Convolution in time = multiplication in Z-domain' },
  { id: 75, subject: 'signals', name: 'Initial Value (Z)', expr: 'x[0] = lim(z→∞) X(z)', desc: 'Initial value theorem for Z-transform' },
  { id: 76, subject: 'signals', name: 'Final Value (LT)', expr: 'lim(t→∞) f(t) = lim(s→0) sF(s)', desc: 'Final value theorem for Laplace transform' },
  { id: 77, subject: 'signals', name: 'Energy Signal', expr: 'E = ∫|x(t)|²dt < ∞, P = 0', desc: 'Finite energy, zero average power' },
  { id: 78, subject: 'signals', name: 'Power Signal', expr: 'P = lim 1/T ∫|x(t)|²dt > 0, E → ∞', desc: 'Finite power, infinite energy' },

  // ─── CONTROL SYSTEMS ───
  { id: 79, subject: 'control', name: 'Closed-Loop TF', expr: 'T(s) = G(s) / (1 + G(s)H(s))', desc: 'Transfer function with feedback H(s)' },
  { id: 80, subject: 'control', name: 'Routh Criterion', expr: 'All 1st column elements > 0 → Stable', desc: 'Stability check without computing roots' },
  { id: 81, subject: 'control', name: 'Gain Margin (dB)', expr: 'GM = -20·log₁₀|G(jω_pc)|', desc: 'At phase crossover freq (∠G = -180°)' },
  { id: 82, subject: 'control', name: '2nd Order System', expr: 'ωₙ²/(s²+2ζωₙs+ωₙ²)', desc: 'ωₙ = natural freq, ζ = damping ratio' },
  { id: 83, subject: 'control', name: 'Steady State Error', expr: 'e_ss = 1/(1+Kp) for step, Type-0', desc: 'Kp = lim(s→0) G(s) = position error constant' },
  { id: 84, subject: 'control', name: 'Phase Margin', expr: 'PM = 180° + ∠G(jω_gc)', desc: 'At gain crossover freq where |G| = 1' },
  { id: 85, subject: 'control', name: 'Mason\'s Gain', expr: 'T = Σ(Pₖ·Δₖ) / Δ', desc: 'Pₖ = kth forward path gain, Δ = determinant' },
  { id: 86, subject: 'control', name: 'Root Locus Angle', expr: 'ΣAngles(zeros) - ΣAngles(poles) = ±180°', desc: 'Angle condition for root locus' },
  { id: 87, subject: 'control', name: 'Peak Overshoot', expr: 'M_p = e^(-πζ/√(1-ζ²)) × 100%', desc: 'For underdamped 2nd order system (ζ < 1)' },
  { id: 88, subject: 'control', name: 'Settling Time', expr: 't_s ≈ 4/(ζωₙ) for 2% criterion', desc: 'Time to settle within ±2% of final value' },
  { id: 89, subject: 'control', name: 'Rise Time', expr: 't_r ≈ (π - cos⁻¹ζ) / ωd', desc: 'ωd = ωₙ√(1-ζ²); time from 0 to 100% of final value' },
  { id: 90, subject: 'control', name: 'State Space', expr: 'ẋ = Ax + Bu, y = Cx + Du', desc: 'State-space representation of LTI system' },
  { id: 91, subject: 'control', name: 'Controllability', expr: 'rank[B AB A²B ... Aⁿ⁻¹B] = n', desc: 'System is controllable if rank = n (state dimension)' },
  { id: 92, subject: 'control', name: 'Observability', expr: 'rank[C; CA; CA²; ... CAⁿ⁻¹] = n', desc: 'System is observable if rank = n' },
  { id: 93, subject: 'control', name: 'Lead Compensator', expr: 'G_c = K(s+z)/(s+p), p > z', desc: 'Improves transient response, adds phase lead' },

  // ─── COMMUNICATIONS ───
  { id: 94, subject: 'comms', name: 'AM Bandwidth', expr: 'BW = 2·f_m, μ = A_m/A_c', desc: 'BW = twice message bandwidth; μ = modulation index' },
  { id: 95, subject: 'comms', name: 'FM Bandwidth (Carson)', expr: 'BW ≈ 2(Δf + f_m) = 2f_m(β+1)', desc: 'β = Δf/f_m = modulation index for FM' },
  { id: 96, subject: 'comms', name: 'Channel Capacity', expr: 'C = B·log₂(1 + S/N)', desc: 'Shannon-Hartley theorem; B = bandwidth in Hz' },
  { id: 97, subject: 'comms', name: 'PCM Bit Rate', expr: 'R_b = f_s · n = 2f_m · n', desc: 'n = bits per sample; f_s = sampling rate' },
  { id: 98, subject: 'comms', name: 'SNR (AM-DSB-SC)', expr: 'SNR_o = A_c²P_m/(2N₀W)', desc: 'Output SNR for coherent detection' },
  { id: 99, subject: 'comms', name: 'AM Power', expr: 'P_t = P_c(1 + μ²/2)', desc: 'Total transmitted power with modulation index μ' },
  { id: 100, subject: 'comms', name: 'Quantization Noise', expr: 'SNR_q = 6.02n + 1.76 dB', desc: 'n = number of quantization bits' },
  { id: 101, subject: 'comms', name: 'Entropy', expr: 'H = -Σ pᵢ·log₂(pᵢ) bits/symbol', desc: 'Source entropy for information theory' },
  { id: 102, subject: 'comms', name: 'BER (BPSK)', expr: 'P_e = Q(√(2E_b/N₀))', desc: 'Bit error rate for BPSK modulation' },
  { id: 103, subject: 'comms', name: 'BER (QPSK)', expr: 'P_e = Q(√(2E_b/N₀))', desc: 'Same BER as BPSK but double bandwidth efficiency' },
  { id: 104, subject: 'comms', name: 'Matched Filter', expr: 'h(t) = s(T-t), SNR_max = 2E/N₀', desc: 'Optimal filter maximizing output SNR' },
  { id: 105, subject: 'comms', name: 'Friis Formula', expr: 'F_total = F₁ + (F₂-1)/G₁ + ...', desc: 'Cascaded noise figure calculation' },
  { id: 106, subject: 'comms', name: 'Noise Temperature', expr: 'T_e = T₀(F - 1)', desc: 'Equivalent noise temperature; T₀ = 290K' },

  // ─── ELECTROMAGNETICS ───
  { id: 107, subject: 'em', name: 'Gauss\'s Law', expr: '∮D·dS = Q_enc = ∫ρᵥdV', desc: 'Electric flux through closed surface = enclosed charge' },
  { id: 108, subject: 'em', name: 'Faraday\'s Law', expr: 'EMF = -dΦ_B/dt, ∮E·dl = -dΦ/dt', desc: 'Changing magnetic flux induces EMF' },
  { id: 109, subject: 'em', name: 'Wave Equation', expr: '∇²E = με·∂²E/∂t², v = 1/√(με)', desc: 'Plane wave propagation in medium' },
  { id: 110, subject: 'em', name: 'Reflection Coeff', expr: 'Γ = (Z_L - Z₀)/(Z_L + Z₀)', desc: 'Transmission line reflection coefficient' },
  { id: 111, subject: 'em', name: 'Poynting Vector', expr: 'P = E × H (W/m²)', desc: 'Direction and magnitude of EM power flow' },
  { id: 112, subject: 'em', name: 'Skin Depth', expr: 'δ = 1/√(πfμσ)', desc: 'Depth at which field drops to 1/e' },
  { id: 113, subject: 'em', name: 'VSWR', expr: 'VSWR = (1+|Γ|)/(1-|Γ|)', desc: 'Voltage standing wave ratio on transmission line' },
  { id: 114, subject: 'em', name: 'Input Impedance (TL)', expr: 'Z_in = Z₀(Z_L+jZ₀tanβl)/(Z₀+jZ_Ltanβl)', desc: 'Input impedance of lossy-less transmission line' },
  { id: 115, subject: 'em', name: 'Quarter-Wave TL', expr: 'Z_in = Z₀²/Z_L', desc: 'Impedance transformer at l = λ/4' },
  { id: 116, subject: 'em', name: 'Ampere\'s Law', expr: '∮H·dl = I_enc + ∫(∂D/∂t)·dS', desc: 'Maxwell\'s modified Ampere\'s law with displacement current' },
  { id: 117, subject: 'em', name: 'Coulomb\'s Law', expr: 'F = q₁q₂/(4πε₀r²) r̂', desc: 'Force between two point charges' },
  { id: 118, subject: 'em', name: 'Cutoff Frequency', expr: 'f_c = c/(2a) for TE₁₀ mode', desc: 'Rectangular waveguide dominant mode cutoff' },
  { id: 119, subject: 'em', name: 'Antenna Gain', expr: 'G = ηD, D = 4πU_max/P_rad', desc: 'η = efficiency, D = directivity' },

  // ─── MICROPROCESSORS ───
  { id: 120, subject: 'micro', name: 'Memory Mapping', expr: 'Address Lines = log₂(Memory Size)', desc: 'Number of address lines for memory size' },
  { id: 121, subject: 'micro', name: 'Interrupt Latency', expr: 't = save_context + ISR_entry', desc: 'Time from interrupt to ISR execution' },
  { id: 122, subject: 'micro', name: 'Bus Bandwidth', expr: 'BW = bus_width × clock_freq', desc: 'Maximum data transfer rate on bus' },
  { id: 123, subject: 'micro', name: 'DMA Transfer', expr: 'Time = N × t_mem (cycle stealing)', desc: 'N = number of bytes; no CPU overhead' },

  // ─── GENERAL APTITUDE ───
  { id: 124, subject: 'aptitude', name: 'Compound Interest', expr: 'A = P(1 + r/n)^(nt)', desc: 'A = final amount, P = principal, r = annual rate' },
  { id: 125, subject: 'aptitude', name: 'Permutation', expr: 'P(n,r) = n! / (n-r)!', desc: 'Ordered selection of r from n objects' },
  { id: 126, subject: 'aptitude', name: 'Combination', expr: 'C(n,r) = n! / (r!(n-r)!)', desc: 'Unordered selection of r from n objects' },
  { id: 127, subject: 'aptitude', name: 'Simple Interest', expr: 'SI = P × r × t / 100', desc: 'P = principal, r = rate%, t = time in years' },
  { id: 128, subject: 'aptitude', name: 'Speed-Distance', expr: 'Speed = Distance / Time', desc: 'Avg speed = total dist / total time' },
  { id: 129, subject: 'aptitude', name: 'Probability', expr: 'P(E) = n(E) / n(S)', desc: 'Favorable outcomes / total outcomes' },
  { id: 130, subject: 'aptitude', name: 'Work-Rate', expr: '1/T = 1/A + 1/B', desc: 'Combined work rate when A & B work together' },
];

/* =============================================
   STORAGE HELPERS
   ============================================= */
let isTestMode = localStorage.getItem('gate_test_mode') === 'true';
const getPrefixedKey = k => isTestMode ? 'test_' + k : k;

const LS = {
  get: (k, def) => { try { const v = localStorage.getItem(getPrefixedKey(k)); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (k, v) => { try { localStorage.setItem(getPrefixedKey(k), JSON.stringify(v)); } catch {} }
};

function toggleTestMode(enabled) {
  localStorage.setItem('gate_test_mode', enabled);
  location.reload();
}

/* =============================================
   GLOBAL STATE
   ============================================= */
let state = {
  topicProgress: LS.get('topicProgress', {}),  // { subjectId_topicIndex: true/false }
  tasks: LS.get('tasks', []),
  mocks: LS.get('mocks', []),
  errors: LS.get('errors', []),
  studyLog: LS.get('studyLog', {}),             // { 'YYYY-MM-DD': [{subject, mins}] }
  weeklyHours: LS.get('weeklyHours', {}),
  streak: LS.get('streak', 0),
  lastStudyDate: LS.get('lastStudyDate', ''),
  sessions: LS.get('sessions', { count: 0, log: [], date: '' }),
  timerState: { running: false, mode: 'pomodoro', seconds: 25*60, totalSeconds: 25*60, intervalId: null }
};

function save() {
  LS.set('topicProgress', state.topicProgress);
  LS.set('tasks', state.tasks);
  LS.set('mocks', state.mocks);
  LS.set('errors', state.errors);
  LS.set('studyLog', state.studyLog);
  LS.set('weeklyHours', state.weeklyHours);
  LS.set('streak', state.streak);
  LS.set('lastStudyDate', state.lastStudyDate);
  LS.set('sessions', state.sessions);
}

/* =============================================
   MIGRATE OLD TOPIC PROGRESS
   ============================================= */
function migrateOldTopicProgress() {
  if (LS.get('topicProgress_migrated', false)) return; // already done
  
  const old = state.topicProgress;
  const oldKeys = Object.keys(old).filter(k => old[k] === true);
  if (oldKeys.length === 0) { LS.set('topicProgress_migrated', true); return; }
  
  // Build mapping: old flat keys -> new nested keys
  // Old format: subjectId_topicIndex (e.g. math_0, networks_2)
  // For each old checked topic, mark ALL sub-subtopics of the corresponding new topic as done
  const oldSubjectIds = ['math','networks','devices','analog','digital','signals','control','comms','em','micro','aptitude'];
  
  let migrated = false;
  oldKeys.forEach(key => {
    const parts = key.split('_');
    if (parts.length !== 2) return;
    const [subId, idxStr] = parts;
    const idx = parseInt(idxStr);
    if (isNaN(idx)) return;
    if (!oldSubjectIds.includes(subId)) return;
    
    // Map 'aptitude' to 'apt' (id changed)
    const newSubId = subId === 'aptitude' ? 'apt' : subId;
    const subject = SUBJECTS.find(s => s.id === newSubId);
    if (!subject || !subject.topics[idx]) return;
    
    const topic = subject.topics[idx];
    // Mark all leaf nodes under this topic as done
    topic.subtopics.forEach(st => {
      st.subsubtopics.forEach((sst, i) => {
        const newKey = `${newSubId}_${topic.id}_${st.id}_${i}`;
        if (!state.topicProgress[newKey]) {
          state.topicProgress[newKey] = true;
          migrated = true;
        }
      });
    });
  });
  
  if (migrated) save();
  LS.set('topicProgress_migrated', true);
}

/* =============================================
   INIT
   ============================================= */
function initApp() {
  const testToggle = document.getElementById('test-mode-toggle');
  if (testToggle) testToggle.checked = isTestMode;

  // Show test mode indicator
  if (isTestMode) {
    const banner = document.createElement('div');
    banner.id = 'test-mode-banner';
    banner.style.cssText = 'position:fixed;top:0;left:0;right:0;height:32px;background:linear-gradient(90deg,#ff8c42,#ff4d6d);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;z-index:9999;letter-spacing:0.5px;';
    banner.textContent = '🧪 TEST MODE — Data saved separately from real data';
    document.body.prepend(banner);
    document.body.style.paddingTop = '32px';
  }

  // Migrate old flat topic keys to new nested keys
  migrateOldTopicProgress();

  setGreeting();
  setHeaderDate();
  populateSubjectDropdowns();
  startCountdown();
  renderDashboard();
  renderSubjects();
  renderTasks();
  renderMocks();
  renderErrors();
  renderFormulas();
  checkStreak();

  // today's task list on dashboard
  renderTodayTasks();
  renderStudyLogList();
  
  // init motivation & reminders
  refreshQuote();
  refreshSideQuote();
  setupMotivationPopups();
  setupReminders();
  
  // generated insights
  generateAIInsights();
}

/* =============================================
   NAVIGATION
   ============================================= */
function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelector(`.nav-item[data-tab="${tab}"]`).classList.add('active');
  if (tab === 'dashboard') renderDashboard();
  if (tab === 'mocks') renderMocks();
  if (tab === 'schedule') renderSchedule();
  if (tab === 'reports') renderReports();
}

/* =============================================
   GREETING & DATE
   ============================================= */
function setGreeting() {
  const h = new Date().getHours();
  const msgs = {
    morning: ["Rise and grind! Let's ace GATE 2027 🌅", "Good morning! Consistency beats intensity 💪", "Morning warrior! Every hour counts ⚡"],
    afternoon: ["Stay focused! You're doing great 🎯", "Afternoon grind! Keep pushing forward 🔥", "Power through the afternoon! ⚡"],
    evening: ["Evening revision time! 📚", "Great time for problem solving! 🧠", "Revise what you learned today 📝"],
    night: ["Night owl study session! 🦉", "Late night grind = AIR 50 mindset 💫", "Stay disciplined — GATE is near! 🎯"]
  };
  const type = h < 12 ? 'morning' : h < 17 ? 'afternoon' : h < 21 ? 'evening' : 'night';
  const arr = msgs[type];
  document.getElementById('greeting-text').textContent = arr[Math.floor(Math.random() * arr.length)];
}

function setHeaderDate() {
  const el = document.getElementById('header-date');
  if (!el) return;
  const d = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  el.innerHTML = `${days[d.getDay()]}<br>${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/* =============================================
   COUNTDOWN
   ============================================= */
function startCountdown() {
  const GATE_DATE = new Date('2027-02-07T09:30:00+05:30');

  function update() {
    const now = new Date();
    const diff = GATE_DATE - now;
    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent = '00';
      document.getElementById('cd-secs').textContent = '00';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hrs = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hrs).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');

    // Phase detection
    const phases = [
      { end: new Date('2026-08-01'), label: '🏗️ Phase 1: Foundation Building' },
      { end: new Date('2026-11-01'), label: '📖 Phase 2: Deep Dive & Problem Solving' },
      { end: new Date('2027-02-01'), label: '🎯 Phase 3: Mock Tests & Revision' },
      { end: GATE_DATE, label: '⚡ Phase 4: Final Sprint!' },
    ];
    const phase = phases.find(p => now < p.end) || { label: '🚀 Exam Time!' };
    document.getElementById('current-phase').textContent = phase.label;
  }

  update();
  setInterval(update, 1000);
}

/* =============================================
   STREAK
   ============================================= */
function checkStreak() {
  const today = todayStr();
  if (state.lastStudyDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];
    if (state.lastStudyDate === yStr) {
      // streak continues
    } else if (state.lastStudyDate !== today) {
      state.streak = 0; // broken
    }
  }
}

function todayStr() { return new Date().toISOString().split('T')[0]; }

/* =============================================
   DASHBOARD
   ============================================= */
let weeklyChartInst = null, pieChartInst = null;

function renderDashboard() {
  renderStreakAndStats();
  renderWeeklyChart();
  renderSubjectPie();
  renderTodayTasks();
  renderStudyLogList();
}

function renderStreakAndStats() {
  document.getElementById('streak-val').textContent = state.streak;

  // Today's study time
  const today = todayStr();
  const todayLog = state.studyLog[today] || [];
  const totalMins = todayLog.reduce((s, e) => s + e.mins, 0);
  document.getElementById('today-hours').textContent = `${Math.floor(totalMins/60)}h ${totalMins%60}m`;

  // Syllabus coverage
  let done = 0, total = 0;
  SUBJECTS.forEach(s => {
    const p = getSubjectProgress(s);
    done += p.done;
    total += p.total;
  });
  const pct = total ? Math.round(done/total*100) : 0;
  document.getElementById('total-topics-done').textContent = pct + '%';

  // Best mock
  if (state.mocks.length) {
    const best = Math.max(...state.mocks.map(m => m.score));
    document.getElementById('best-mock').textContent = best.toFixed(1);
  } else {
    document.getElementById('best-mock').textContent = '--';
  }
}

function renderWeeklyChart() {
  const ctx = document.getElementById('weeklyChart');
  if (!ctx) return;
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const data = getWeeklyData();

  if (weeklyChartInst) weeklyChartInst.destroy();
  weeklyChartInst = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: 'Hours',
        data: data,
        backgroundColor: data.map((v, i) => i === getTodayDayIndex() ? 'rgba(108,99,255,0.8)' : 'rgba(108,99,255,0.3)'),
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9aa3c4', font: { family: 'Inter', size: 12 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9aa3c4', font: { family: 'Inter', size: 12 } }, beginAtZero: true }
      }
    }
  });
}

function renderSubjectPie() {
  const ctx = document.getElementById('subjectPieChart');
  if (!ctx) return;

  const labels = [], data = [], colors = [];
  SUBJECTS.forEach(s => {
    let done = 0;
    s.topics.forEach((_, i) => { if (state.topicProgress[`${s.id}_${i}`]) done++; });
    labels.push(s.name.split(' ').slice(0,2).join(' '));
    data.push(done);
    colors.push(s.color);
  });

  if (pieChartInst) pieChartInst.destroy();
  pieChartInst = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors.map(c => c + 'bb'), borderColor: colors, borderWidth: 2 }]
    },
    options: {
      responsive: true,
      cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#9aa3c4', font: { family: 'Inter', size: 11 }, padding: 12, boxWidth: 12 } }
      }
    }
  });
}

function getWeeklyData() {
  const result = Array(7).fill(0);
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const log = state.studyLog[key] || [];
    const mins = log.reduce((s, e) => s + e.mins, 0);
    const dayIdx = (d.getDay() + 6) % 7; // Mon=0
    result[dayIdx] = +(mins/60).toFixed(1);
  }
  return result;
}

function getTodayDayIndex() { return (new Date().getDay() + 6) % 7; }

function renderTodayTasks() {
  const container = document.getElementById('today-tasks-list');
  if (!container) return;
  const today = todayStr();
  const todayTasks = state.tasks.filter(t => t.date === today).slice(0, 5);
  if (todayTasks.length === 0) {
    container.innerHTML = `<p class="empty-state-small">No tasks for today. <span style="color:#6c63ff;cursor:pointer" onclick="switchTab('planner')">Add one →</span></p>`;
    return;
  }
  container.innerHTML = todayTasks.map(t => `
    <div class="task-item">
      <div class="task-check ${t.done ? 'checked' : ''}" onclick="toggleTask('${t.id}')"></div>
      <span class="task-text ${t.done ? 'done' : ''}">${t.title}</span>
      <span class="task-badge badge-${t.priority}">${t.priority}</span>
    </div>
  `).join('');
}

/* =============================================
   STUDY LOG (Quick Log)
   ============================================= */
function populateSubjectDropdowns() {
  const ids = ['ql-subject','task-subject','timer-subject','error-subject','error-filter-subject'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    SUBJECTS.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.name;
      el.appendChild(opt);
    });
  });
}

function logStudyTime() {
  const subject = document.getElementById('ql-subject').value;
  const hours = parseInt(document.getElementById('ql-hours').value) || 0;
  const mins = parseInt(document.getElementById('ql-mins').value) || 0;
  const totalMins = hours * 60 + mins;
  if (!subject || totalMins <= 0) { alert('Please select a subject and enter time.'); return; }

  const today = todayStr();
  if (!state.studyLog[today]) state.studyLog[today] = [];
  state.studyLog[today].push({ subject, mins: totalMins, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });

  // Update streak
  if (state.lastStudyDate !== today) {
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];
    state.streak = (state.lastStudyDate === yStr) ? state.streak + 1 : 1;
    state.lastStudyDate = today;
  }

  // Clear inputs
  document.getElementById('ql-hours').value = '';
  document.getElementById('ql-mins').value = '';
  document.getElementById('ql-subject').value = '';

  save();
  renderDashboard();
}

function renderStudyLogList() {
  const container = document.getElementById('study-log-list');
  if (!container) return;
  const today = todayStr();
  const log = (state.studyLog[today] || []).slice().reverse().slice(0, 4);
  if (log.length === 0) {
    container.innerHTML = '<p class="empty-state-small">Nothing logged yet today.</p>';
    return;
  }
  container.innerHTML = log.map(e => {
    const sub = SUBJECTS.find(s => s.id === e.subject);
    return `
      <div class="log-entry">
        <div>
          <div class="log-entry-sub">${sub ? sub.name : e.subject}</div>
          <div style="font-size:11px;color:#5c6487">${e.time}</div>
        </div>
        <div class="log-entry-time">${Math.floor(e.mins/60)}h ${e.mins%60}m</div>
      </div>`;
  }).join('');
}

/* =============================================
   SUBJECTS & SYLLABUS TREE
   ============================================= */
function getSubjectProgress(s) {
  let total = 0;
  let done = 0;
  s.topics.forEach(t => {
    t.subtopics.forEach(st => {
      st.subsubtopics.forEach((sst, i) => {
        total++;
        if (state.topicProgress[`${s.id}_${t.id}_${st.id}_${i}`]) done++;
      });
    });
  });
  return { total, done, pct: total === 0 ? 0 : Math.round((done/total)*100) };
}

function renderSubjects() {
  const grid = document.getElementById('subjects-grid');
  if (!grid) return;
  grid.innerHTML = SUBJECTS.map(s => {
    const p = getSubjectProgress(s);
    
    // Instead of rendering all topics, we'll just show a summary and a button to open syllabus tracker
    const wClass = s.weight === 'high' ? 'weight-high' : s.weight === 'med' ? 'weight-med' : 'weight-low';
    const wLabel = s.weight === 'high' ? '🔴 High' : s.weight === 'med' ? '🟡 Medium' : '🟢 Low';

    return `
      <div class="subject-card">
        <div class="subject-top">
          <div>
            <div class="subject-name">${s.name}</div>
            <div style="font-size:12px;color:${s.color};font-weight:600;margin-top:2px">~${s.marks} marks</div>
          </div>
          <span class="subject-weight ${wClass}">${wLabel}</span>
        </div>
        <div class="subject-progress-bar">
          <div class="subject-progress-fill" style="width:${p.pct}%;background:linear-gradient(90deg,${s.color}aa,${s.color})"></div>
        </div>
        <div style="font-size:12px;color:var(--text3);margin-top:4px;display:flex;justify-content:space-between">
          <span>${p.done} / ${p.total} topics</span>
          <span>${p.pct}%</span>
        </div>
        <button class="btn-primary" style="margin-top:16px;width:100%;font-size:13px;padding:8px" onclick="toggleSyllabusDrawer()">📝 Open Tracker</button>
      </div>`;
  }).join('');
}

function toggleSyllabusDrawer() {
  const drawer = document.getElementById('syllabus-drawer');
  const overlay = document.getElementById('syllabus-overlay');
  if (drawer.classList.contains('open')) {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
  } else {
    drawer.classList.add('open');
    overlay.classList.add('show');
    renderSyllabusTree();
  }
}

function renderSyllabusTree() {
  const container = document.getElementById('syllabus-tree-container');
  if (!container) return;
  
  container.innerHTML = SUBJECTS.map((s, sIdx) => {
    const p = getSubjectProgress(s);
    
    const topicsHtml = s.topics.map(t => {
      const subtopicsHtml = t.subtopics.map(st => {
        const subsubsHtml = st.subsubtopics.map((sst, i) => {
          const key = `${s.id}_${t.id}_${st.id}_${i}`;
          const isChecked = state.topicProgress[key] ? 'checked' : '';
          return `
            <div class="tree-subsub">
              <input type="checkbox" id="${key}" ${isChecked} onchange="toggleSubSubTopic('${s.id}', '${t.id}', '${st.id}', ${i}, this.checked)">
              <label for="${key}">${sst}</label>
            </div>
          `;
        }).join('');
        return `
          <div class="tree-subtopic">
            <div class="tree-subtopic-title">${st.title}</div>
            ${subsubsHtml}
          </div>
        `;
      }).join('');
      return `
        <div class="tree-topic">
          <div class="tree-topic-title">• ${t.title}</div>
          ${subtopicsHtml}
        </div>
      `;
    }).join('');
    
    // Check if previously expanded in session, or default closed
    return `
      <div class="tree-subject" id="tree-sub-${s.id}">
        <div class="tree-subject-header" onclick="document.getElementById('tree-sub-${s.id}').classList.toggle('expanded')">
          <span>${s.name}</span>
          <span style="font-size:12px;color:var(--text3);font-weight:normal">${p.pct}%</span>
        </div>
        <div class="tree-topics">
          ${topicsHtml}
        </div>
      </div>
    `;
  }).join('');
}

function toggleSubSubTopic(sId, tId, stId, i, checked) {
  const key = `${sId}_${tId}_${stId}_${i}`;
  state.topicProgress[key] = checked;
  save();
  // Update dashboard and subjects view silently behind
  renderSubjects();
  renderStreakAndStats();
  if (typeof renderSubjectPie === 'function') renderSubjectPie();
  
  // Update the mini progress indicator in the tree header instantly
  const s = SUBJECTS.find(subj => subj.id === sId);
  if (s) {
    const p = getSubjectProgress(s);
    const header = document.querySelector(`#tree-sub-${s.id} .tree-subject-header span:last-child`);
    if (header) header.textContent = p.pct + '%';
  }
}

/* =============================================
   PLANNER
   ============================================= */
let currentFilter = 'all';

function openAddTask() {
  document.getElementById('task-title').value = '';
  document.getElementById('task-subject').value = '';
  document.getElementById('task-date').value = todayStr();
  document.getElementById('task-priority').value = 'medium';
  document.getElementById('task-modal').classList.add('open');
}

function addTask() {
  const title = document.getElementById('task-title').value.trim();
  const subject = document.getElementById('task-subject').value;
  const date = document.getElementById('task-date').value;
  const priority = document.getElementById('task-priority').value;
  if (!title) { alert('Please enter a task title.'); return; }

  state.tasks.unshift({ id: Date.now().toString(), title, subject, date: date || todayStr(), priority, done: false, created: Date.now() });
  save();
  closeModal('task-modal');
  renderTasks();
  renderTodayTasks();
}

function filterTasks(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTasks();
}

function renderTasks() {
  const container = document.getElementById('tasks-container');
  const today = todayStr();
  let tasks = [...state.tasks];

  if (currentFilter === 'today') tasks = tasks.filter(t => t.date === today);
  else if (currentFilter === 'pending') tasks = tasks.filter(t => !t.done);
  else if (currentFilter === 'done') tasks = tasks.filter(t => t.done);

  // Sort: pending first, then by date
  tasks.sort((a, b) => { if (a.done !== b.done) return a.done ? 1 : -1; return a.date < b.date ? -1 : 1; });

  if (tasks.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><p>No tasks found.<br/>Add a new task to get started!</p></div>`;
    return;
  }

  container.innerHTML = tasks.map(t => {
    const sub = SUBJECTS.find(s => s.id === t.subject);
    const isOverdue = !t.done && t.date < today;
    return `
      <div class="planner-task ${t.done ? 'done' : ''}">
        <div class="task-check ${t.done ? 'checked' : ''}" onclick="toggleTask('${t.id}')"></div>
        <div class="planner-task-info">
          <div class="planner-task-title ${t.done ? 'done' : ''}">${t.title}</div>
          <div class="planner-task-meta">
            ${sub ? `<span style="color:${sub.color}">${sub.name}</span> · ` : ''}
            <span style="color:${isOverdue ? '#ff4d6d' : '#5c6487'}">${formatDate(t.date)}${isOverdue ? ' ⚠️ overdue' : ''}</span>
          </div>
        </div>
        <span class="task-badge badge-${t.priority}">${t.priority}</span>
        <div class="planner-task-actions">
          <button class="btn-icon" onclick="deleteTask('${t.id}')" title="Delete">🗑</button>
        </div>
      </div>`;
  }).join('');
}

function toggleTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (task) { task.done = !task.done; save(); renderTasks(); renderTodayTasks(); }
}

function deleteTask(id) {
  state.tasks = state.tasks.filter(t => t.id !== id);
  save(); renderTasks(); renderTodayTasks();
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

/* =============================================
   POMODORO TIMER
   ============================================= */
const MODES = { pomodoro: 25*60, short: 5*60, long: 15*60 };
const CIRCUMFERENCE = 2 * Math.PI * 88; // r=88

function setTimerMode(mode) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('mode-' + mode);
  if (btn) btn.classList.add('active');
  document.getElementById('custom-time-inputs').classList.toggle('hidden', mode !== 'custom');

  resetTimer();
  state.timerState.mode = mode;
  
  if (mode === 'custom') {
    document.getElementById('timer-label').textContent = 'Custom';
    return;
  }
  
  if (mode === 'stopwatch') {
    state.timerState.seconds = 0;
    state.timerState.totalSeconds = 0;
    document.getElementById('timer-label').textContent = 'Stopwatch';
  } else {
    state.timerState.seconds = MODES[mode];
    state.timerState.totalSeconds = MODES[mode];
    const label = mode === 'pomodoro' ? 'Focus' : mode === 'short' ? 'Short Break' : 'Long Break';
    document.getElementById('timer-label').textContent = label;
  }
  updateTimerDisplay();
}

function toggleTimer() {
  if (state.timerState.running) { pauseTimer(); }
  else { startTimer(); }
}

function startTimer() {
  if (state.timerState.mode === 'custom') {
    const mins = parseInt(document.getElementById('custom-mins').value) || 25;
    state.timerState.seconds = mins * 60;
    state.timerState.totalSeconds = mins * 60;
  }
  if (state.timerState.mode !== 'stopwatch' && state.timerState.seconds <= 0) return;
  state.timerState.running = true;
  document.getElementById('timer-toggle').textContent = '⏸ Pause';
  
  if (state.timerState.mode === 'stopwatch') {
    document.querySelector('.btn-timer-skip').innerHTML = '⏹';
    document.querySelector('.btn-timer-skip').title = 'Stop & Log';
  } else {
    document.querySelector('.btn-timer-skip').innerHTML = '⏭';
    document.querySelector('.btn-timer-skip').title = 'Skip';
  }
  
  state.timerState.intervalId = setInterval(timerTick, 1000);
}

function pauseTimer() {
  state.timerState.running = false;
  clearInterval(state.timerState.intervalId);
  document.getElementById('timer-toggle').textContent = '▶ Resume';
}

function resetTimer() {
  clearInterval(state.timerState.intervalId);
  state.timerState.running = false;
  const mode = state.timerState.mode;
  if (mode === 'stopwatch') {
    state.timerState.seconds = 0;
    state.timerState.totalSeconds = 0;
  } else {
    state.timerState.seconds = mode === 'custom' ? 25*60 : (MODES[mode] || 25*60);
    state.timerState.totalSeconds = state.timerState.seconds;
  }
  document.getElementById('timer-toggle').textContent = '▶ Start';
  document.querySelector('.btn-timer-skip').innerHTML = '⏭';
  document.querySelector('.btn-timer-skip').title = 'Skip';
  updateTimerDisplay();
}

function skipTimer() {
  clearInterval(state.timerState.intervalId);
  state.timerState.running = false;
  
  if (state.timerState.mode === 'stopwatch') {
    if (state.timerState.seconds >= 60) {
      state.timerState.totalSeconds = state.timerState.seconds;
      onTimerComplete();
    } else {
      resetTimer();
    }
  } else {
    onTimerComplete();
  }
}

function timerTick() {
  if (state.timerState.mode === 'stopwatch') {
    state.timerState.seconds++;
    updateTimerDisplay();
  } else {
    state.timerState.seconds--;
    updateTimerDisplay();
    if (state.timerState.seconds <= 0) {
      clearInterval(state.timerState.intervalId);
      state.timerState.running = false;
      onTimerComplete();
    }
  }
}

function updateTimerDisplay() {
  const s = state.timerState.seconds;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  
  let text = '';
  if (h > 0) text = `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  else text = `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  
  document.getElementById('timer-display').textContent = text;

  // Ring progress
  const ring = document.getElementById('ring-progress');
  if (state.timerState.mode === 'stopwatch') {
    ring.style.strokeDasharray = CIRCUMFERENCE;
    ring.style.strokeDashoffset = 0;
  } else {
    const fraction = state.timerState.totalSeconds > 0 ? s / state.timerState.totalSeconds : 1;
    ring.style.strokeDasharray = CIRCUMFERENCE;
    ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - fraction);
  }
}

function onTimerComplete() {
  const mode = state.timerState.mode;
  const today = todayStr();
  const subject = document.getElementById('timer-subject').value;

  // Log session
  if (!state.sessions.date || state.sessions.date !== today) {
    state.sessions = { count: 0, log: [], date: today };
  }

  if (mode === 'pomodoro' || mode === 'custom' || mode === 'stopwatch') {
    state.sessions.count++;
    const mins = state.timerState.totalSeconds / 60;
    
    let typeLabel = '';
    if (mode === 'pomodoro') typeLabel = '🍅 Pomodoro';
    else if (mode === 'stopwatch') typeLabel = `⏱ ${Math.round(mins)}m Stopwatch`;
    else typeLabel = `⏱ ${Math.round(mins)}m custom`;

    state.sessions.log.unshift({
      type: typeLabel,
      subject: subject ? SUBJECTS.find(s => s.id === subject)?.name : '—',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Auto-log to study log if subject selected
    if (subject) {
      if (!state.studyLog[today]) state.studyLog[today] = [];
      state.studyLog[today].push({ subject, mins: Math.round(mins), time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) });
      if (state.lastStudyDate !== today) {
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split('T')[0];
        state.streak = (state.lastStudyDate === yStr) ? state.streak + 1 : 1;
        state.lastStudyDate = today;
      }
    }
  }

  save();
  renderSessionLog();

  // Notification
  try {
    new Notification('GATE Study Companion', {
      body: mode === 'stopwatch' ? 'Session logged!' : (mode === 'pomodoro' ? '🍅 Pomodoro complete! Take a break.' : '⏰ Break over! Back to studying.'),
      icon: ''
    });
  } catch {}

  // Play beep if defined
  if (typeof playBeep === 'function') playBeep();

  document.getElementById('timer-toggle').textContent = '▶ Start';
  document.querySelector('.btn-timer-skip').innerHTML = '⏭';
  
  if (mode === 'stopwatch') {
    setTimerMode('stopwatch'); // Reset and stay in stopwatch mode
  } else {
    setTimerMode(mode === 'pomodoro' ? (state.sessions.count % 4 === 0 ? 'long' : 'short') : 'pomodoro');
  }
}

function renderSessionLog() {
  const count = state.sessions.count || 0;
  document.getElementById('session-count').textContent = count;
  const tomatoes = '🍅'.repeat(Math.min(count, 8));
  document.getElementById('tomato-icons').textContent = tomatoes || '🍅';

  const log = document.getElementById('session-log');
  const entries = state.sessions.log || [];
  if (entries.length === 0) {
    log.innerHTML = '<p class="empty-state-small">No sessions yet today</p>';
    return;
  }
  log.innerHTML = entries.slice(0, 6).map(e => `
    <div class="session-entry">
      <div>
        <div class="session-entry-type">${e.type}</div>
        <div style="font-size:11px;color:#5c6487">${e.subject}</div>
      </div>
      <div class="session-entry-time">${e.time}</div>
    </div>`).join('');
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start(); osc.stop(ctx.currentTime + 0.8);
  } catch {}
}

/* =============================================
   MOCK SCORES
   ============================================= */
let mockChartInst = null;

function openAddMock() {
  document.getElementById('mock-name').value = '';
  document.getElementById('mock-score').value = '';
  document.getElementById('mock-date').value = todayStr();
  document.getElementById('mock-notes').value = '';
  document.getElementById('mock-modal').classList.add('open');
}

function addMockScore() {
  const name = document.getElementById('mock-name').value.trim();
  const score = parseFloat(document.getElementById('mock-score').value);
  const date = document.getElementById('mock-date').value;
  const notes = document.getElementById('mock-notes').value.trim();
  if (!name || isNaN(score) || score < 0 || score > 100) { alert('Please fill in all required fields correctly.'); return; }

  state.mocks.push({ id: Date.now().toString(), name, score, date, notes, created: Date.now() });
  state.mocks.sort((a, b) => a.date < b.date ? -1 : 1);
  save();
  closeModal('mock-modal');
  renderMocks();
}

function renderMocks() {
  // Stats
  if (state.mocks.length) {
    const scores = state.mocks.map(m => m.score);
    document.getElementById('mock-best').textContent = Math.max(...scores).toFixed(1);
    document.getElementById('mock-latest').textContent = scores[scores.length-1].toFixed(1);
    document.getElementById('mock-avg').textContent = (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1);
    document.getElementById('mock-count').textContent = scores.length;
  }

  // Chart
  renderMockChart();

  // List
  const list = document.getElementById('mock-list');
  if (!state.mocks.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div><p>No mock tests logged yet.<br/>Add your first score to start tracking!</p></div>`;
    return;
  }

  list.innerHTML = [...state.mocks].reverse().map(m => {
    const score = m.score;
    const cls = score >= 70 ? 'score-excellent' : score >= 60 ? 'score-good' : score >= 50 ? 'score-average' : 'score-poor';
    return `
      <div class="mock-entry">
        <div class="mock-score-badge ${cls}">${score.toFixed(1)}</div>
        <div class="mock-entry-info">
          <div class="mock-entry-name">${m.name}</div>
          <div class="mock-entry-meta">${formatDate(m.date)}</div>
          ${m.notes ? `<div class="mock-entry-notes">📌 ${m.notes}</div>` : ''}
        </div>
        <button class="btn-icon" onclick="deleteMock('${m.id}')">🗑</button>
      </div>`;
  }).join('');
}

function renderMockChart() {
  const ctx = document.getElementById('mockChart');
  if (!ctx) return;
  if (mockChartInst) mockChartInst.destroy();
  if (state.mocks.length === 0) return;

  const labels = state.mocks.map(m => m.name.length > 20 ? m.name.slice(0,20)+'…' : m.name);
  const scores = state.mocks.map(m => m.score);

  mockChartInst = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Score',
        data: scores,
        borderColor: '#6c63ff',
        backgroundColor: 'rgba(108,99,255,0.1)',
        pointBackgroundColor: scores.map(s => s >= 70 ? '#00e5a0' : s >= 60 ? '#00d9ff' : s >= 50 ? '#ffd166' : '#ff4d6d'),
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }, {
        label: 'Target (70)',
        data: Array(labels.length).fill(70),
        borderColor: 'rgba(255,77,109,0.5)',
        borderDash: [6,3],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#9aa3c4', font: { family: 'Inter', size: 12 }, boxWidth: 16 } }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9aa3c4', font: { family: 'Inter', size: 11 } } },
        y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9aa3c4', font: { family: 'Inter', size: 11 } } }
      }
    }
  });
}

function deleteMock(id) {
  if (!confirm('Delete this mock entry?')) return;
  state.mocks = state.mocks.filter(m => m.id !== id);
  save(); renderMocks();
}

/* =============================================
   ERROR NOTEBOOK
   ============================================= */
function openAddError() {
  document.getElementById('error-topic').value = '';
  document.getElementById('error-subject').value = '';
  document.getElementById('error-type').value = 'concept';
  document.getElementById('error-desc').value = '';
  document.getElementById('error-lesson').value = '';
  document.getElementById('error-modal').classList.add('open');
}

function addError() {
  const topic = document.getElementById('error-topic').value.trim();
  const subject = document.getElementById('error-subject').value;
  const type = document.getElementById('error-type').value;
  const desc = document.getElementById('error-desc').value.trim();
  const lesson = document.getElementById('error-lesson').value.trim();
  if (!topic) { alert('Please enter the topic/question.'); return; }

  state.errors.unshift({ id: Date.now().toString(), topic, subject, type, desc, lesson, date: todayStr(), created: Date.now() });
  save();
  closeModal('error-modal');
  renderErrors();
}

function renderErrors() {
  const search = (document.getElementById('error-search')?.value || '').toLowerCase();
  const filterSub = document.getElementById('error-filter-subject')?.value || '';
  const filterType = document.getElementById('error-filter-type')?.value || '';

  let errors = state.errors.filter(e => {
    if (search && !e.topic.toLowerCase().includes(search) && !e.desc?.toLowerCase().includes(search)) return false;
    if (filterSub && e.subject !== filterSub) return false;
    if (filterType && e.type !== filterType) return false;
    return true;
  });

  const container = document.getElementById('errors-list');
  if (errors.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📓</div><p>${state.errors.length ? 'No errors match your filter.' : 'Your error notebook is empty.<br/>Log mistakes to review and improve!'}</p></div>`;
    return;
  }

  const typeLabels = { concept: 'Concept Gap', formula: 'Wrong Formula', calculation: 'Calculation', misread: 'Misread', silly: 'Silly Mistake' };

  container.innerHTML = errors.map(e => {
    const sub = SUBJECTS.find(s => s.id === e.subject);
    return `
      <div class="error-card type-${e.type}">
        <div class="error-card-header">
          <div class="error-topic">${e.topic}</div>
          <div class="error-tags">
            ${sub ? `<span class="error-tag tag-subject">${sub.name.split(' ').slice(0,2).join(' ')}</span>` : ''}
            <span class="error-tag tag-type">${typeLabels[e.type] || e.type}</span>
            <button class="btn-icon" onclick="deleteError('${e.id}')" style="margin-left:4px">🗑</button>
          </div>
        </div>
        ${e.desc ? `<div class="error-section"><div class="error-section-label">What went wrong</div><div class="error-section-text">${e.desc}</div></div>` : ''}
        ${e.lesson ? `<div class="error-section error-lesson"><div class="error-section-label">✅ Lesson / Fix</div><div class="error-section-text">${e.lesson}</div></div>` : ''}
        <div style="font-size:11px;color:#5c6487;margin-top:8px">${formatDate(e.date)}</div>
      </div>`;
  }).join('');
}

function deleteError(id) {
  if (!confirm('Delete this error entry?')) return;
  state.errors = state.errors.filter(e => e.id !== id);
  save(); renderErrors();
}

/* =============================================
   FORMULA BANK
   ============================================= */
let formulaSubject = 'all';

function renderFormulas() {
  // Build tab bar
  const tabBar = document.getElementById('formula-tabs');
  if (tabBar && tabBar.childElementCount === 0) {
    const allTab = document.createElement('button');
    allTab.className = 'formula-tab active';
    allTab.textContent = 'All';
    allTab.onclick = () => { formulaSubject = 'all'; updateFormulaTabs(); renderFormulas(); };
    tabBar.appendChild(allTab);

    SUBJECTS.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'formula-tab';
      btn.textContent = s.name.split(' ').slice(0, 2).join(' ');
      btn.dataset.subjectId = s.id;
      btn.onclick = () => { formulaSubject = s.id; updateFormulaTabs(); renderFormulas(); };
      tabBar.appendChild(btn);
    });
  }

  const search = (document.getElementById('formula-search')?.value || '').toLowerCase();

  let formulas = FORMULAS.filter(f => {
    if (formulaSubject !== 'all' && f.subject !== formulaSubject) return false;
    if (search && !f.name.toLowerCase().includes(search) && !f.expr.toLowerCase().includes(search) && !f.desc?.toLowerCase().includes(search)) return false;
    return true;
  });

  const grid = document.getElementById('formulas-grid');
  if (formulas.length === 0) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🔢</div><p>No formulas match your search.</p></div>`;
    return;
  }

  grid.innerHTML = formulas.map(f => {
    const sub = SUBJECTS.find(s => s.id === f.subject);
    return `
      <div class="formula-card">
        <div class="formula-card-top">
          <div class="formula-name">${f.name}</div>
          ${sub ? `<span class="formula-subject-tag" style="background:${sub.color}22;color:${sub.color}">${sub.name.split(' ').slice(0,2).join(' ')}</span>` : ''}
        </div>
        <div class="formula-expr">${f.expr}</div>
        ${f.desc ? `<div class="formula-desc">${f.desc}</div>` : ''}
      </div>`;
  }).join('');
}

function updateFormulaTabs() {
  document.querySelectorAll('.formula-tab').forEach(btn => {
    const isAll = btn.textContent === 'All';
    btn.classList.toggle('active', isAll ? formulaSubject === 'all' : btn.dataset.subjectId === formulaSubject);
  });
}

/* =============================================
   MODAL HELPERS
   ============================================= */
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

/* =============================================
   NOTIFICATION PERMISSION
   ============================================= */
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}

/* =============================================
   INIT TIMER DISPLAY
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  updateTimerDisplay();
  renderSessionLog();
  // Restore session log for today
  const today = todayStr();
  if (state.sessions.date !== today) {
    state.sessions = { count: 0, log: [], date: today };
  }
  renderSessionLog();
});

/* =============================================
   MOTIVATION / QUOTES
   ============================================= */
const QUOTES = [
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.", author: "Colin Powell" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "David Goggins" },
  { text: "Focus on the step in front of you, not the whole staircase.", author: "Unknown" },
  { text: "If you want to achieve greatness stop asking for permission.", author: "Anonymous" },
  { text: "It’s going to be hard, but hard does not mean impossible.", author: "Unknown" },
  { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
  { text: "Work hard in silence, let your success be your noise.", author: "Frank Ocean" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Arnold Schwarzenegger" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  { text: "Success doesn’t just find you. You have to go out and get it.", author: "Unknown" },
  { text: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Unknown" },
  { text: "Dream bigger. Do bigger.", author: "Unknown" },
  { text: "Don’t stop until you’re proud.", author: "Unknown" },
  { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
  { text: "It’s not about having time. It’s about making time.", author: "Unknown" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
  { text: "A river cuts through rock, not because of its power, but because of its persistence.", author: "Jim Watkins" }
];

function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

function refreshQuote() {
  const q = getRandomQuote();
  const qt = document.getElementById('qod-text');
  const qa = document.getElementById('qod-author');
  if (qt) qt.textContent = `"${q.text}"`;
  if (qa) qa.textContent = `— ${q.author}`;
}

let motivationInterval = null;
function setupMotivationPopups() {
  // Show a popup every 45 minutes of active session
  if (motivationInterval) clearInterval(motivationInterval);
  motivationInterval = setInterval(() => {
    showMotivationToast();
  }, 45 * 60 * 1000); 
  
  // Also hook into hour changes if needed, but random popups + QOD handles it.
}

function showMotivationToast() {
  const q = getRandomQuote();
  showNotification('Motivation Boost ⚡', `"${q.text}" — ${q.author}`, 'toast-spark');
}

function showNotification(title, message, iconClass = 'toast-spark') {
  const toastQuote = document.getElementById('toast-quote');
  if (toastQuote) {
    toastQuote.innerHTML = message; // Using innerHTML to allow some formatting if needed
  }
  const toastAuthor = document.getElementById('toast-author');
  if (toastAuthor) {
    toastAuthor.textContent = ''; // Clear author, handled in message now or generic
  }
  
  const toastLabel = document.querySelector('.toast-label');
  if (toastLabel) toastLabel.textContent = title;
  
  const toast = document.getElementById('motivation-toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => dismissToast(), 10000);
  }
  
  // Trigger system notification if permitted
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body: message.replace(/<[^>]*>?/gm, ''), icon: 'favicon.ico' });
  }
}

// Reminders
function setupReminders() {
  setInterval(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    
    // Check at exactly the 0th second of the minute
    if (s === 0) {
      if (h === 6 && m === 0) showNotification('Wake Up! 🌅', 'Time to freshen up and get ready for the day.');
      if (h === 6 && m === 30) showNotification('Classes Starting 🏫', 'Coaching classes begin now. Pay attention and take good notes!');
      if (h === 14 && m === 0) showNotification('Class Over! 🍽️', 'Time for lunch and a quick break. You earned it!');
      if (h === 14 && m === 30) showNotification('Self Study Time 📚', 'Break is over. Let\'s review today\'s coaching material.');
      if (h === 19 && m === 30) showNotification('Evening Break 🍲', 'Time for dinner and a commute/walk. Recharge yourself.');
      if (h === 20 && m === 30) showNotification('Night Revision 🧠', 'Last push for the day! Let\'s do some PYQs or revise formulas.');
      if (h === 23 && m === 30) showNotification('Sleep Time 😴', 'Close your books. A well-rested brain performs 10x better tomorrow.');
    }
  }, 1000);
}

// AI Insights Generator
function generateAIInsights() {
  const container = document.getElementById('ai-insights-content');
  if (!container) return;
  
  let totalMins = 0;
  const subjectMins = {};
  SUBJECTS.forEach(s => subjectMins[s.id] = 0);
  
  for (const date in state.studyLog) {
    state.studyLog[date].forEach(entry => {
      subjectMins[entry.subject] = (subjectMins[entry.subject] || 0) + entry.mins;
      totalMins += entry.mins;
    });
  }
  
  let mostStudied = null;
  let leastStudied = null;
  let maxMins = -1;
  let minMins = Infinity;
  
  SUBJECTS.forEach(s => {
    const mins = subjectMins[s.id];
    if (mins > maxMins) { maxMins = mins; mostStudied = s; }
    // Only count as least studied if they haven't touched it much, but ignore if totally 0 to avoid nagging about untouched subjects early on
    if (mins < minMins) { minMins = mins; leastStudied = s; }
  });
  
  let insights = [];
  
  // Streak insight
  if (state.streak >= 3) {
    insights.push(`🔥 You are on a **${state.streak}-day study streak**. Consistency is the #1 predictor of GATE success. Keep it up!`);
  } else if (state.streak === 0) {
    insights.push(`💡 Remember to log your study hours today to start building your streak.`);
  }
  
  // Subject insights
  if (mostStudied && maxMins > 120) {
    insights.push(`📈 You've spent a lot of time on **${mostStudied.name}** (${(maxMins/60).toFixed(1)}h). Great focus!`);
  }
  if (leastStudied && minMins < 60 && totalMins > 300) {
    insights.push(`⚠️ You might want to allocate more time to **${leastStudied.name}**. It's currently your least practiced subject.`);
  }
  
  // General insight based on time
  const today = todayStr();
  const todayMins = (state.studyLog[today] || []).reduce((s, e) => s + e.mins, 0);
  if (todayMins >= 240) {
    insights.push(`⭐ You've hit your minimum self-study target for today. Anything extra now is pushing you towards top ranker territory.`);
  }
  
  if (insights.length === 0) {
    insights.push("Start logging your study sessions to receive personalized AI insights and recommendations.");
  }
  
  container.innerHTML = insights.map(i => `<div class="insight-item">${i.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>`).join('');
}

function dismissToast() {
  const toast = document.getElementById('motivation-toast');
  if (toast) toast.classList.remove('show');
}

// Alias for backward compat
function hideMotivationToast() { dismissToast(); }

function refreshSideQuote() {
  const q = getRandomQuote();
  const qt = document.getElementById('mc-quote-text');
  const qa = document.getElementById('mc-quote-author');
  if (qt) qt.textContent = `"${q.text}"`;
  if (qa) qa.textContent = `— ${q.author}`;
}

function openQuoteModal() {
  const q = getRandomQuote();
  const mqText = document.getElementById('qm-quote');
  if (mqText) {
    mqText.textContent = `"${q.text}"`;
  }
  const mqAuthor = document.getElementById('qm-author');
  if (mqAuthor) {
    mqAuthor.textContent = `— ${q.author}`;
  }
  const overlay = document.getElementById('quote-modal');
  if (overlay) {
    overlay.classList.add('open');
    dismissToast();
  }
}

function closeQuoteModal() {
  const overlay = document.getElementById('quote-modal-overlay');
  if (overlay) overlay.classList.remove('open');
}

/* =============================================
   SCHEDULE TAB
   ============================================= */
function renderSchedule() {
  // Populate schedule side quote on load
  refreshSideQuote();
  
  const tlContainer = document.getElementById('schedule-timeline');
  if (!tlContainer) return;
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const timeFloat = currentHour + currentMin/60;
  
  const scheduleData = [
    { start: 6.0, end: 6.5, label: 'Wake up, Freshen up', type: 'sleep', classStr: 'tl-sleep', timeStr: '06:00 AM' },
    { start: 6.5, end: 13.5, label: 'Coaching Classes', type: 'class', classStr: 'tl-class', timeStr: '06:30 AM', sub: 'Primary Learning Phase' },
    { start: 13.5, end: 15.0, label: 'Lunch & Commute', type: 'break', classStr: 'tl-break', timeStr: '01:30 PM' },
    { start: 15.0, end: 16.5, label: 'Power Nap / Rest', type: 'sleep', classStr: 'tl-sleep', timeStr: '03:00 PM' },
    { start: 16.5, end: 18.5, label: 'Self Study: Session 1', type: 'study', classStr: 'tl-study', timeStr: '04:30 PM', sub: 'Review coaching notes' },
    { start: 18.5, end: 19.5, label: 'Evening Break / Workout', type: 'break', classStr: 'tl-break', timeStr: '06:30 PM' },
    { start: 19.5, end: 21.5, label: 'Self Study: Session 2', type: 'study', classStr: 'tl-study', timeStr: '07:30 PM', sub: 'Problem solving / PYQs' },
    { start: 21.5, end: 22.5, label: 'Dinner & Relax', type: 'break', classStr: 'tl-break', timeStr: '09:30 PM' },
    { start: 22.5, end: 23.5, label: 'Light Revision & Planning', type: 'study', classStr: 'tl-study', timeStr: '10:30 PM' },
    { start: 23.5, end: 30.0, label: 'Sleep', type: 'sleep', classStr: 'tl-sleep', timeStr: '11:30 PM', sub: 'Recharge for tomorrow' }
  ];
  
  tlContainer.innerHTML = scheduleData.map(item => {
    let isNow = false;
    let timeCheck = timeFloat;
    // handling past midnight sleep
    if (item.end > 24 && timeFloat < 6) timeCheck += 24; 
    
    if (timeCheck >= item.start && timeCheck < item.end) isNow = true;
    
    return `
      <div class="tl-item">
        <div class="tl-dot ${isNow ? 'tl-now' : item.classStr}">
          <div class="tl-dot-inner"></div>
        </div>
        <div class="tl-content">
          <div class="tl-time">${item.timeStr}</div>
          <div class="tl-title">${item.label}</div>
          ${item.sub ? `<div class="tl-sub">${item.sub}</div>` : ''}
          ${isNow ? `<div class="tl-now-label">Current Phase</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  // also update daily targets dynamically based on log
  const today = todayStr();
  const totalMins = (state.studyLog[today] || []).reduce((s, e) => s + e.mins, 0);
  const hrs = (totalMins / 60).toFixed(1);
  const targetHrs = 4; // goal
  
  const schedTargetEl = document.getElementById('sched-target-hrs');
  if (schedTargetEl) schedTargetEl.textContent = `${hrs} / ${targetHrs}h`;
}

/* =============================================
   REPORTS / ANALYTICS
   ============================================= */
let subjectHoursChartInst = null;
let dailyTrendChartInst = null;

function renderReports() {
  renderReportSummaries();
  renderSubjectHoursChart();
  renderDailyTrendChart();
  renderHeatmap();
  renderBreakdown();
}

function renderReportSummaries() {
  const container = document.getElementById('report-summary-grid');
  if (!container) return;
  
  let totalMins = 0;
  let activeDays = 0;
  for (const date in state.studyLog) {
    const dayMins = state.studyLog[date].reduce((sum, entry) => sum + entry.mins, 0);
    if (dayMins > 0) {
      activeDays++;
      totalMins += dayMins;
    }
  }
  
  let mockAvg = 0;
  if (state.mocks.length) {
    mockAvg = state.mocks.reduce((s, m) => s + m.score, 0) / state.mocks.length;
  }
  
  const avgDaily = activeDays > 0 ? (totalMins / 60 / activeDays).toFixed(1) : '0';
  
  container.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon blue">⏱️</div>
      <div class="stat-info">
        <div class="stat-value">${(totalMins/60).toFixed(1)}h</div>
        <div class="stat-label">Total Study Hours</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon green">📅</div>
      <div class="stat-info">
        <div class="stat-value">${activeDays}</div>
        <div class="stat-label">Active Days</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon purple">📊</div>
      <div class="stat-info">
        <div class="stat-value">${avgDaily}h</div>
        <div class="stat-label">Avg Daily Hours</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange">📝</div>
      <div class="stat-info">
        <div class="stat-value">${mockAvg ? mockAvg.toFixed(1) : '--'}</div>
        <div class="stat-label">Mock Average</div>
      </div>
    </div>
  `;
}

function renderSubjectHoursChart() {
  const ctx = document.getElementById('subjectHoursChart');
  if (!ctx) return;
  
  const agg = {};
  SUBJECTS.forEach(s => agg[s.id] = 0);
  for (const date in state.studyLog) {
    state.studyLog[date].forEach(entry => {
      if (agg[entry.subject] !== undefined) agg[entry.subject] += entry.mins;
    });
  }
  
  const labels = [];
  const data = [];
  const colors = [];
  SUBJECTS.forEach(s => {
    if (agg[s.id] > 0) {
      labels.push(s.name.split(' ').slice(0,2).join(' '));
      data.push(+(agg[s.id] / 60).toFixed(1));
      colors.push(s.color);
    }
  });
  
  if (subjectHoursChartInst) subjectHoursChartInst.destroy();
  
  if (data.length === 0) {
    ctx.parentElement.innerHTML = '<div class="chart-header"><h3>Subject-wise Hours Studied</h3></div><div class="empty-state-small" style="padding:20px">No data yet. Log study time to see charts.</div>';
    return;
  }
  
  subjectHoursChartInst = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors.map(c => c + 'cc'),
        borderColor: colors,
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true, indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9aa3c4', font: { family: 'Inter', size: 11 } } },
        y: { grid: { display: false }, ticks: { color: '#c5c9e0', font: { family: 'Inter', size: 11 } } }
      }
    }
  });
}

function renderDailyTrendChart() {
  const ctx = document.getElementById('dailyTrendChart');
  if (!ctx) return;
  
  const labels = [];
  const data = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    labels.push(d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }));
    const log = state.studyLog[key] || [];
    data.push(+(log.reduce((s, e) => s + e.mins, 0) / 60).toFixed(1));
  }
  
  if (dailyTrendChartInst) dailyTrendChartInst.destroy();
  dailyTrendChartInst = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data, fill: true,
        backgroundColor: 'rgba(108,99,255,0.15)',
        borderColor: '#6c63ff',
        borderWidth: 2, tension: 0.35,
        pointBackgroundColor: '#6c63ff',
        pointRadius: 3, pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9aa3c4', font: { family: 'Inter', size: 10 }, maxRotation: 45 } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9aa3c4', font: { family: 'Inter', size: 11 } }, beginAtZero: true }
      }
    }
  });
}

function renderHeatmap() {
  const grid = document.getElementById('heatmap-grid');
  if (!grid) return;
  
  const cells = [];
  const today = new Date();
  const numDays = 90; // show last 90 days
  
  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    let mins = 0;
    if (state.studyLog[dateStr]) {
      mins = state.studyLog[dateStr].reduce((s, e) => s + e.mins, 0);
    }
    
    let level = 0;
    if (mins > 0) level = 1;
    if (mins >= 120) level = 2;
    if (mins >= 240) level = 3;
    if (mins >= 360) level = 4;
    
    const hrs = (mins/60).toFixed(1);
    cells.push({ dateStr, level, dateObj: d, hrs });
  }
  
  let cols = [];
  let currCol = [];
  
  const firstDay = cells[0].dateObj.getDay();
  for (let j=0; j<firstDay; j++) currCol.push(null);
  
  cells.forEach(c => {
    currCol.push(c);
    if (currCol.length === 7) {
      cols.push(currCol);
      currCol = [];
    }
  });
  if (currCol.length > 0) {
    while(currCol.length < 7) currCol.push(null);
    cols.push(currCol);
  }
  
  let html = '';
  cols.forEach(col => {
    html += '<div class="heatmap-col">';
    col.forEach(c => {
      if (c === null) {
        html += '<div style="width:13px;height:13px"></div>';
      } else {
        html += `<div class="heatmap-cell" data-level="${c.level}" title="${c.dateStr}: ${c.hrs}h studied"></div>`;
      }
    });
    html += '</div>';
  });
  
  grid.innerHTML = html;
}

function renderBreakdown() {
  const container = document.getElementById('breakdown-table');
  if (!container) return;
  
  const agg = {};
  SUBJECTS.forEach(s => agg[s.id] = { name: s.name, color: s.color, mins: 0 });
  
  let totalAllMins = 0;
  for (const date in state.studyLog) {
    state.studyLog[date].forEach(entry => {
      if (agg[entry.subject]) {
        agg[entry.subject].mins += entry.mins;
        totalAllMins += entry.mins;
      }
    });
  }
  
  const data = Object.values(agg).filter(x => x.mins > 0).sort((a,b) => b.mins - a.mins);
  
  if (data.length === 0) {
    container.innerHTML = `<div class="empty-state-small" style="padding: 20px;">No subject data logged yet. Start logging to see breakdown.</div>`;
    return;
  }
  
  container.innerHTML = data.map(d => {
    const pct = totalAllMins > 0 ? (d.mins / totalAllMins * 100).toFixed(1) : 0;
    const hrs = (d.mins / 60).toFixed(1);
    
    return `
      <div class="breakdown-row">
        <div class="breakdown-color" style="background:${d.color}"></div>
        <div class="breakdown-subject">${d.name}</div>
        <div class="breakdown-bar-wrap">
          <div class="breakdown-bar" style="width: ${pct}%; background: ${d.color}; box-shadow: 0 0 8px ${d.color}aa;"></div>
        </div>
        <div class="breakdown-hours">${hrs}h</div>
        <div class="breakdown-pct">${pct}%</div>
      </div>
    `;
  }).join('');
}
