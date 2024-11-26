interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  isStrong: boolean;
}

export const validatePassword = (password: string): PasswordStrength => {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long');
  } else {
    score += 1;
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    feedback.push('Add an uppercase letter');
  } else {
    score += 1;
  }

  // Lowercase check
  if (!/[a-z]/.test(password)) {
    feedback.push('Add a lowercase letter');
  } else {
    score += 1;
  }

  // Number check
  if (!/\d/.test(password)) {
    feedback.push('Add a number');
  } else {
    score += 1;
  }

  // Special character check
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push('Add a special character (!@#$%^&*(),.?":{}|<>)');
  } else {
    score += 1;
  }

  // Common patterns check
  const commonPatterns = [
    '123456', 'password', 'qwerty', 'abc123',
    'letmein', 'admin', '12345', '123123'
  ];
  
  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    feedback.push('Avoid common password patterns');
    score = Math.max(0, score - 1);
  }

  // Sequential characters check
  if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
    feedback.push('Avoid sequential letters');
    score = Math.max(0, score - 1);
  }

  // Sequential numbers check
  if (/012|123|234|345|456|567|678|789/.test(password)) {
    feedback.push('Avoid sequential numbers');
    score = Math.max(0, score - 1);
  }

  // Repeated characters check
  if (/(.)\1{2,}/.test(password)) {
    feedback.push('Avoid repeated characters');
    score = Math.max(0, score - 1);
  }

  return {
    score,
    feedback: feedback.length ? feedback : ['Password is strong'],
    isStrong: score >= 4 && feedback.length === 1
  };
};

export const getPasswordStrengthColor = (score: number): string => {
  switch (score) {
    case 0:
      return '#ff0000'; // Red
    case 1:
      return '#ff4d00'; // Orange-Red
    case 2:
      return '#ffa700'; // Orange
    case 3:
      return '#a3ff00'; // Light Green
    case 4:
    case 5:
      return '#00ff00'; // Green
    default:
      return '#ff0000';
  }
};
