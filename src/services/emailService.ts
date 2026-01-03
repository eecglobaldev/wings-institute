// import { BRANCHES } from '../data/branches';

// Firebase Cloud Functions URLs
const SEND_EMAIL_OTP_URL = "https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/sendEmailOtpUSA";
const VERIFY_EMAIL_OTP_URL = "https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/verifyEmailOtpUSA";
// const SEND_REGISTRATION_EMAILS_URL = "https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/sendRegistrationEmailsUSA";
const SEND_REGISTRATION_EMAILS_UNIVERSAL_URL = "https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/sendRegistrationEmailsUniversal";
const SEND_EVENT_REGISTRATION_EMAILS_URL = "https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/sendWingsEventsEmail";

export const sendEmailOtp = async (email: string, targetCountry: string = 'Australia'): Promise<boolean> => {
  try {
    const response = await fetch(SEND_EMAIL_OTP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        targetCountry: targetCountry,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error sending email OTP:', error);
    return false;
  }
};

export const verifyEmailOtp = async (email: string, otp: string): Promise<boolean> => {
  try {
    const response = await fetch(VERIFY_EMAIL_OTP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error verifying email OTP:', error);
    return false;
  }
};

// Get counselor emails from a branch
// Accepts either branch identifier (ID) or branch name
// export const getCounselorEmailsFromBranch = (branchIdentifierOrName: string): string[] => {
//   // Try to find by identifier first (numeric ID)
//   let branch = BRANCHES.find(b => b.identifier === branchIdentifierOrName);
  
//   // If not found by identifier, try to find by name
//   if (!branch) {
//     branch = BRANCHES.find(b => b.name === branchIdentifierOrName);
//   }
  
//   if (!branch || !branch.counselors) {
//     return [];
//   }
  
//   // Extract emails from counselors, filter out empty emails
//   return branch.counselors
//     .map(counselor => counselor.email)
//     .filter(email => email && email.trim() !== '');
// };

// // Format user data for email (this will be used in {{message}} variable)
// // Using pipe separator for plain text compatibility (no HTML tags)
// // Now includes both registration data and academic plan data
// const formatUserDataForEmail = (userData: any, academicPlan?: any): string => {
//   let details = `\n=== REGISTRATION DETAILS ===\n`;
//   details += `Name: ${userData.name || 'N/A'}\n`;
//   details += `Email: ${userData.email || 'N/A'}\n`;
//   details += `Phone: +91 ${userData.phone || 'N/A'}\n`;
//   details += `State: ${userData.state || 'N/A'}\n`;
//   details += `City: ${userData.city || 'N/A'}\n`;
//   details += `Target Country: ${userData.targetCountry || 'N/A'}\n`;
//   details += `EEC is Admissions Agent: ${userData.isEECAgent || 'N/A'}\n`;
//   if (userData.isEECAgent === 'Yes' && userData.branch) {
//     const branchName = typeof userData.branch === 'string' && !userData.branch.match(/^\d+$/) 
//       ? userData.branch 
//       : (BRANCHES.find(b => b.identifier === userData.branch)?.name || userData.branch);
//     details += `Selected Branch: ${branchName}\n`;
//   }
//   details += `Registration Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n`;
  
//   // Add Academic Plan details if provided
//   if (academicPlan) {
//     details += `\n=== ACADEMIC PLAN DETAILS ===\n`;
//     details += `US University: ${academicPlan.university || 'N/A'}\n`;
//     details += `Course Level: ${academicPlan.courseLevel || 'N/A'}\n`;
//     details += `Course: ${academicPlan.course || 'N/A'}\n`;
//     details += `Last Qualification: ${academicPlan.lastQualification || 'N/A'}\n`;
//     details += `Grade: ${academicPlan.grade || 'N/A'}\n`;
//     details += `Indian University: ${academicPlan.indianUniversity || 'N/A'}\n`;
    
//     // Sponsors
//     if (academicPlan.sponsors && academicPlan.sponsors.length > 0) {
//       details += `\nSponsors:\n`;
//       academicPlan.sponsors.forEach((sponsor: any, index: number) => {
//         details += `  Sponsor ${index + 1}: ${sponsor.type || 'N/A'}\n`;
        
//         // Handle Parents - shows both father and mother
//         if (sponsor.type === 'Parents') {
//           if (sponsor.fatherOccupation) {
//             details += `    Father Occupation: ${sponsor.fatherOccupation}\n`;
//           }
//           if (sponsor.fatherAnnualIncomeUSD) {
//             details += `    Father Income (USD): ${sponsor.fatherAnnualIncomeUSD}\n`;
//           }
//           if (sponsor.motherOccupation) {
//             details += `    Mother Occupation: ${sponsor.motherOccupation}\n`;
//           }
//           if (sponsor.motherAnnualIncomeUSD) {
//             details += `    Mother Income (USD): ${sponsor.motherAnnualIncomeUSD}\n`;
//           }
//         }
//         // Handle Father - shows only father details
//         else if (sponsor.type === 'Father') {
//           if (sponsor.fatherOccupation) {
//             details += `    Occupation: ${sponsor.fatherOccupation}\n`;
//           }
//           if (sponsor.fatherAnnualIncomeUSD) {
//             details += `    Annual Income (USD): ${sponsor.fatherAnnualIncomeUSD}\n`;
//           }
//           if (sponsor.fatherAnnualIncomeINR) {
//             details += `    Annual Income (INR Lakhs): ${sponsor.fatherAnnualIncomeINR}\n`;
//           }
//         }
//         // Handle Mother - shows only mother details
//         else if (sponsor.type === 'Mother') {
//           if (sponsor.motherOccupation) {
//             details += `    Occupation: ${sponsor.motherOccupation}\n`;
//           }
//           if (sponsor.motherAnnualIncomeUSD) {
//             details += `    Annual Income (USD): ${sponsor.motherAnnualIncomeUSD}\n`;
//           }
//           if (sponsor.motherAnnualIncomeINR) {
//             details += `    Annual Income (INR Lakhs): ${sponsor.motherAnnualIncomeINR}\n`;
//           }
//         }
//         // Handle Other Family Member
//         else if (sponsor.type === 'Other Family Member') {
//           if (sponsor.otherRelationship) {
//             details += `    Relationship: ${sponsor.otherRelationship}\n`;
//           }
//           if (sponsor.otherOccupation) {
//             details += `    Occupation: ${sponsor.otherOccupation}\n`;
//           }
//           if (sponsor.otherAnnualIncomeUSD) {
//             details += `    Annual Income (USD): ${sponsor.otherAnnualIncomeUSD}\n`;
//           }
//           if (sponsor.otherAnnualIncomeINR) {
//             details += `    Annual Income (INR Lakhs): ${sponsor.otherAnnualIncomeINR}\n`;
//           }
//         }
//         // Handle Corporate or Government Sponsor
//         else if (sponsor.type === 'Corporate Sponsor' || sponsor.type === 'Government Sponsor') {
//           if (sponsor.sponsorName) {
//             details += `    Sponsor Name: ${sponsor.sponsorName}\n`;
//           }
//         }
//         // Handle University Scholarship
//         else if (sponsor.type === 'University Scholarship') {
//           if (sponsor.scholarshipType) {
//             details += `    Scholarship Type: ${sponsor.scholarshipType}\n`;
//           }
//           if (sponsor.scholarshipAmountUSD) {
//             details += `    Scholarship Amount (USD): ${sponsor.scholarshipAmountUSD}\n`;
//           }
//         }
//         // Handle Graduate Assistantship
//         else if (sponsor.type === 'Graduate Assistantship (TA/RA)') {
//           if (sponsor.assistantshipDetails) {
//             details += `    Assistantship Type: ${sponsor.assistantshipDetails}\n`;
//           }
//           if (sponsor.assistantshipWaiver) {
//             details += `    Waiver: ${sponsor.assistantshipWaiver}\n`;
//           }
//           if (sponsor.assistantshipWaiverAmount) {
//             details += `    Waiver Amount: ${sponsor.assistantshipWaiverAmount}\n`;
//           }
//           if (sponsor.hasStipend === 'Yes' && sponsor.stipendAmount) {
//             details += `    Stipend Amount: ${sponsor.stipendAmount}\n`;
//           }
//         }
//         // Handle Out-of-state tuition waiver
//         else if (sponsor.type === 'Out-of-state tuition waiver') {
//           if (sponsor.waiverAmount) {
//             details += `    Waiver Amount: ${sponsor.waiverAmount}\n`;
//           }
//         }
//       });
//     }
    
//     // Career Goals
//     if (academicPlan.careerGoals) {
//       details += `\nCareer Goals:\n`;
//       details += `  Goal: ${academicPlan.careerGoals.goal || 'N/A'}\n`;
//       details += `  Details: ${academicPlan.careerGoals.details || 'N/A'}\n`;
//     }
    
//     // Work Experience
//     if (academicPlan.workExperience && academicPlan.workExperience.length > 0) {
//       details += `\nWork Experience:\n`;
//       academicPlan.workExperience.forEach((exp: any, index: number) => {
//         details += `  Experience ${index + 1}: ${exp.type || 'N/A'} - ${exp.role || 'N/A'}\n`;
//         details += `    Duration: ${exp.duration || 'N/A'}\n`;
//         details += `    Description: ${exp.description || 'N/A'}\n`;
//       });
//     }
    
//     // Test Scores
//     if (academicPlan.testScores) {
//       details += `\nTest Scores:\n`;
//       const scores = academicPlan.testScores;
      
//       // English Test Waivers
//       const waivers: string[] = [];
//       if (scores.waiverIB) {
//         waivers.push('IB or Cambridge IGCSE');
//       }
//       if (scores.waiverIndianBoard) {
//         waivers.push('CBSE/ICSE/State Board');
//       }
//       if (scores.waiverUniversity) {
//         waivers.push('University Waiver');
//       }
      
//       if (waivers.length > 0) {
//         details += `  English Test Waiver: ${waivers.join(', ')}\n`;
//       }
      
//       // Test Scores
//       if (scores.ielts) details += `  IELTS: ${scores.ielts}\n`;
//       if (scores.toefl) details += `  TOEFL: ${scores.toefl}\n`;
//       if (scores.gre) details += `  GRE: ${scores.gre}\n`;
//       if (scores.sat) details += `  SAT: ${scores.sat}\n`;
//       if (scores.gmat) details += `  GMAT: ${scores.gmat}\n`;
//       if (scores.pte) details += `  PTE: ${scores.pte}\n`;
//       if (scores.duolingo) details += `  Duolingo: ${scores.duolingo}\n`;
//       if (scores.otherTestName && scores.otherTestScore) {
//         details += `  ${scores.otherTestName}: ${scores.otherTestScore}\n`;
//       }
//     }
    
//     // Immigration History
//     details += `\nImmigration History:\n`;
//     details += `  Has Refusal: ${academicPlan.hasRefusal || 'no'}\n`;
//     if (academicPlan.hasRefusal === 'yes') {
//       details += `    Refusal Type: ${academicPlan.refusalType || 'N/A'}\n`;
//       details += `    Refusal Reason: ${academicPlan.refusalReason || 'N/A'}\n`;
//     }
//     details += `  Has Traveled: ${academicPlan.hasTraveled || 'no'}\n`;
//     if (academicPlan.hasTraveled === 'yes') {
//       details += `    Travel Details: ${academicPlan.travelDetails || 'N/A'}\n`;
//     }
//     details += `  Has Petition: ${academicPlan.hasPetition || 'no'}\n`;
//     if (academicPlan.hasPetition === 'yes') {
//       details += `    Petition Details: ${academicPlan.petitionDetails || 'N/A'}\n`;
//     }
    
//     // Additional Details
//     if (academicPlan.additionalDetails) {
//       details += `\nAdditional Details: ${academicPlan.additionalDetails}\n`;
//     }
//   }
  
//   return details;
// };

// // Build complete email body with header and footer
const buildCompleteEmailBody = (userData: any, academicPlan?: any): string => {
  let body = `New User Registration - Wings Enquiry Mail\n\n`;
  
  // Registration Details Section
  body += "REGISTRATION DETAILS\n";
  body += "────────────────────────────────────────\n";
  body += `Name: ${userData.name || 'N/A'}\n`;
  body += `Email: ${userData.email || 'N/A'}\n`;
  body += `Phone: ${userData.phone || 'N/A'}\n`;
  body += `Education Level: ${userData.highestQualification || 'N/A'}\n`;
  body += `Interested Course: ${userData.interestedCourse || 'N/A'}\n`;
  body += `Date of Birth: ${userData.dateOfBirth || 'N/A'}\n`;
  
  
  const registrationDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata'
  });
  body += `Registration Date: ${registrationDate}\n\n`;
  
  // Academic Plan Details Section
  if (academicPlan) {
    body += "\n\nACADEMIC PLAN DETAILS\n";
    body += "────────────────────────────────────────\n";
    
    // New Zealand format fields
    if (academicPlan.institutionType) {
      body += `Institution Type: ${academicPlan.institutionType}\n`;
    }
    if (academicPlan.institutionName) {
      body += `Institution Name: ${academicPlan.institutionName}\n`;
    }
    if (academicPlan.courseLevel) {
      body += `Course Level: ${academicPlan.courseLevel}\n`;
    }
    if (academicPlan.courseName) {
      body += `Course Name: ${academicPlan.courseName}\n`;
    }
    if (academicPlan.previousEducation) {
      body += `Previous Education: ${academicPlan.previousEducation}\n`;
    }
    // Note: workExperience, careerGoals, and testScores are printed in detailed sections below
    if (academicPlan.usesFTS !== undefined) {
      body += `Using FTS: ${academicPlan.usesFTS ? 'Yes' : 'No'}\n`;
    }
    
    // USA format fields (for backward compatibility)
    if (academicPlan.university) {
      body += `US University: ${academicPlan.university}\n`;
    }
    if (academicPlan.course) {
      body += `Course: ${academicPlan.course}\n`;
    }
    if (academicPlan.lastQualification) {
      body += `Last Qualification: ${academicPlan.lastQualification}\n`;
    }
    if (academicPlan.grade) {
      body += `Grade: ${academicPlan.grade}\n`;
    }
    if (academicPlan.indianUniversity) {
      body += `Indian University: ${academicPlan.indianUniversity}\n`;
    }
    
    // Financial Dossier (New Zealand format)
    if (academicPlan.primarySponsor) {
      body += "\nFinancial Dossier:\n";
      body += `  Primary Sponsor: ${academicPlan.primarySponsor}\n`;
      if (academicPlan.sponsor1Name) {
        body += `  Sponsor 1 Name: ${academicPlan.sponsor1Name}\n`;
      }
      if (academicPlan.sponsor1Profession) {
        body += `  Sponsor 1 Profession: ${academicPlan.sponsor1Profession}\n`;
      }
      if (academicPlan.sponsor1Income) {
        body += `  Sponsor 1 Income: ${academicPlan.sponsor1Income}\n`;
      }
      if (academicPlan.sponsor2Name) {
        body += `  Sponsor 2 Name: ${academicPlan.sponsor2Name}\n`;
      }
      if (academicPlan.sponsor2Profession) {
        body += `  Sponsor 2 Profession: ${academicPlan.sponsor2Profession}\n`;
      }
      if (academicPlan.sponsor2Income) {
        body += `  Sponsor 2 Income: ${academicPlan.sponsor2Income}\n`;
      }
      if (academicPlan.fundingSources) {
        body += `  Funding Sources:\n`;
        if (academicPlan.fundingSources.familySavings) {
          body += `    Family Savings: ${academicPlan.fundingSources.familySavings}\n`;
        }
        if (academicPlan.fundingSources.educationLoan) {
          body += `    Education Loan: ${academicPlan.fundingSources.educationLoan}\n`;
        }
        if (academicPlan.fundingSources.personalSavings) {
          body += `    Personal Savings: ${academicPlan.fundingSources.personalSavings}\n`;
        }
      }
    }
    
    // Personal & Immigration History (New Zealand format)
    if (academicPlan.maritalStatus) {
      body += "\nPersonal & Immigration History:\n";
      body += `  Marital Status: ${academicPlan.maritalStatus}\n`;
      if (academicPlan.maritalStatus === 'Married') {
        if (academicPlan.dateOfMarriage) {
          body += `    Date of Marriage: ${academicPlan.dateOfMarriage}\n`;
        }
        if (academicPlan.marriageDurationInMonths !== null && academicPlan.marriageDurationInMonths !== undefined) {
          body += `    Marriage Duration (Months): ${academicPlan.marriageDurationInMonths}\n`;
        }
        if (academicPlan.spouseAccompanying) {
          body += `    Spouse Accompanying: ${academicPlan.spouseAccompanying}\n`;
        }
        if (academicPlan.spouseQualification) {
          body += `    Spouse Qualification: ${academicPlan.spouseQualification}\n`;
        }
        if (academicPlan.spouseExperience) {
          body += `    Spouse Experience: ${academicPlan.spouseExperience}\n`;
        }
        if (academicPlan.childrenAccompanying) {
          body += `    Children Accompanying: ${academicPlan.childrenAccompanying}\n`;
        }
        if (academicPlan.numberOfChildren) {
          body += `    Number of Children: ${academicPlan.numberOfChildren}\n`;
        }
        if (academicPlan.childrenAges) {
          body += `    Children Ages: ${academicPlan.childrenAges}\n`;
        }
      }
      if (academicPlan.hasVisaRefusal) {
        body += `  Has Visa Refusal: ${academicPlan.hasVisaRefusal}\n`;
        if (academicPlan.hasVisaRefusal === 'yes' && academicPlan.refusalReason) {
          body += `    Refusal Reason: ${academicPlan.refusalReason}\n`;
        }
      }
    }
    
    // Sponsors (USA format - for backward compatibility)
    if (academicPlan.sponsors && academicPlan.sponsors.length > 0) {
      body += "\nSponsors:\n";
      academicPlan.sponsors.forEach((sponsor: any, index: number) => {
        body += `  Sponsor ${index + 1}: ${sponsor.type || 'N/A'}\n`;
        
        if (sponsor.type === 'Parents') {
          if (sponsor.fatherOccupation) {
            body += `    Father Occupation: ${sponsor.fatherOccupation}\n`;
          }
          if (sponsor.fatherAnnualIncomeUSD) {
            body += `    Father Income (USD): ${sponsor.fatherAnnualIncomeUSD}\n`;
          }
          if (sponsor.motherOccupation) {
            body += `    Mother Occupation: ${sponsor.motherOccupation}\n`;
          }
          if (sponsor.motherAnnualIncomeUSD) {
            body += `    Mother Income (USD): ${sponsor.motherAnnualIncomeUSD}\n`;
          }
        } else if (sponsor.type === 'Father') {
          if (sponsor.fatherOccupation) {
            body += `    Occupation: ${sponsor.fatherOccupation}\n`;
          }
          if (sponsor.fatherAnnualIncomeUSD) {
            body += `    Annual Income (USD): ${sponsor.fatherAnnualIncomeUSD}\n`;
          }
          if (sponsor.fatherAnnualIncomeINR) {
            body += `    Annual Income (INR Lakhs): ${sponsor.fatherAnnualIncomeINR}\n`;
          }
        } else if (sponsor.type === 'Mother') {
          if (sponsor.motherOccupation) {
            body += `    Occupation: ${sponsor.motherOccupation}\n`;
          }
          if (sponsor.motherAnnualIncomeUSD) {
            body += `    Annual Income (USD): ${sponsor.motherAnnualIncomeUSD}\n`;
          }
          if (sponsor.motherAnnualIncomeINR) {
            body += `    Annual Income (INR Lakhs): ${sponsor.motherAnnualIncomeINR}\n`;
          }
        } else if (sponsor.type === 'Other Family Member') {
          if (sponsor.otherRelationship) {
            body += `    Relationship: ${sponsor.otherRelationship}\n`;
          }
          if (sponsor.otherOccupation) {
            body += `    Occupation: ${sponsor.otherOccupation}\n`;
          }
          if (sponsor.otherAnnualIncomeUSD) {
            body += `    Annual Income (USD): ${sponsor.otherAnnualIncomeUSD}\n`;
          }
          if (sponsor.otherAnnualIncomeINR) {
            body += `    Annual Income (INR Lakhs): ${sponsor.otherAnnualIncomeINR}\n`;
          }
        } else if (sponsor.type === 'Corporate Sponsor' || sponsor.type === 'Government Sponsor') {
          if (sponsor.sponsorName) {
            body += `    Sponsor Name: ${sponsor.sponsorName}\n`;
          }
        } else if (sponsor.type === 'University Scholarship') {
          if (sponsor.scholarshipType) {
            body += `    Scholarship Type: ${sponsor.scholarshipType}\n`;
          }
          if (sponsor.scholarshipAmountUSD) {
            body += `    Scholarship Amount (USD): ${sponsor.scholarshipAmountUSD}\n`;
          }
        } else if (sponsor.type === 'Graduate Assistantship (TA/RA)') {
          if (sponsor.assistantshipDetails) {
            body += `    Assistantship Type: ${sponsor.assistantshipDetails}\n`;
          }
          if (sponsor.assistantshipWaiver) {
            body += `    Waiver: ${sponsor.assistantshipWaiver}\n`;
          }
          if (sponsor.assistantshipWaiverAmount) {
            body += `    Waiver Amount: ${sponsor.assistantshipWaiverAmount}\n`;
          }
          if (sponsor.hasStipend === 'Yes' && sponsor.stipendAmount) {
            body += `    Stipend Amount: ${sponsor.stipendAmount}\n`;
          }
        } else if (sponsor.type === 'Out-of-state tuition waiver') {
          if (sponsor.waiverAmount) {
            body += `    Waiver Amount: ${sponsor.waiverAmount}\n`;
          }
        }
      });
    }
    
    // Career Goals (handle both USA object format and NZ string format)
    if (academicPlan.careerGoals) {
      body += "\nCareer Goals:\n";
      
      // Check if it's an object (USA format) or string (NZ format)
      if (typeof academicPlan.careerGoals === 'object' && academicPlan.careerGoals.goal) {
        // USA format - object with goal and details
        if (academicPlan.careerGoals.goal) {
          body += `  Goal: ${academicPlan.careerGoals.goal}\n`;
        }
        if (academicPlan.careerGoals.details) {
          body += `  Details: ${academicPlan.careerGoals.details}\n`;
        }
      } else if (typeof academicPlan.careerGoals === 'string') {
        // NZ format - simple string
        body += `  ${academicPlan.careerGoals}\n`;
      }
    }
    
    // Work Experience (handle both USA array format and NZ string format)
    if (academicPlan.workExperience) {
      body += "\nWork Experience:\n";
      
      // Check if it's an array (USA format) or string (NZ format)
      if (Array.isArray(academicPlan.workExperience)) {
        // USA format - array of work experience objects
        academicPlan.workExperience.forEach((exp: any, index: number) => {
          body += `  Experience ${index + 1}: ${exp.type || 'N/A'} - ${exp.role || 'N/A'}\n`;
          if (exp.duration) {
            body += `    Duration: ${exp.duration}\n`;
          }
          if (exp.description) {
            body += `    Description: ${exp.description}\n`;
          }
        });
      } else if (typeof academicPlan.workExperience === 'string') {
        // NZ format - simple string
        body += `  ${academicPlan.workExperience}\n`;
      }
    }
    
    // Test Scores (handle both USA object format and NZ string format)
    if (academicPlan.testScores) {
      body += "\nTest Scores:\n";
      
      // Check if it's an object (USA format) or string (NZ format)
      if (typeof academicPlan.testScores === 'object' && !Array.isArray(academicPlan.testScores)) {
        // USA format - object with individual test scores
        const scores = academicPlan.testScores;
        
        // English Test Waivers
        const waivers: string[] = [];
        if (scores.waiverIB) {
          waivers.push('IB or Cambridge IGCSE');
        }
        if (scores.waiverIndianBoard) {
          waivers.push('CBSE/ICSE/State Board');
        }
        if (scores.waiverUniversity) {
          waivers.push('University Waiver');
        }
        
        if (waivers.length > 0) {
          body += `  English Test Waiver: ${waivers.join(', ')}\n`;
        }
        
        // Test Scores
        if (scores.ielts) body += `  IELTS: ${scores.ielts}\n`;
        if (scores.toefl) body += `  TOEFL: ${scores.toefl}\n`;
        if (scores.gre) body += `  GRE: ${scores.gre}\n`;
        if (scores.sat) body += `  SAT: ${scores.sat}\n`;
        if (scores.gmat) body += `  GMAT: ${scores.gmat}\n`;
        if (scores.pte) body += `  PTE: ${scores.pte}\n`;
        if (scores.duolingo) body += `  Duolingo: ${scores.duolingo}\n`;
        if (scores.otherTestName && scores.otherTestScore) {
          body += `  ${scores.otherTestName}: ${scores.otherTestScore}\n`;
        }
      } else if (typeof academicPlan.testScores === 'string') {
        // NZ format - simple string
        body += `  ${academicPlan.testScores}\n`;
      }
    }
    
    // Immigration History (USA format - for backward compatibility)
    if (academicPlan.hasRefusal || academicPlan.hasTraveled || academicPlan.hasPetition) {
      body += "\nImmigration History:\n";
      body += `  Has Refusal: ${academicPlan.hasRefusal || 'no'}\n`;
      if (academicPlan.hasRefusal === 'yes') {
        if (academicPlan.refusalType) {
          body += `    Refusal Type: ${academicPlan.refusalType}\n`;
        }
        if (academicPlan.refusalReason) {
          body += `    Refusal Reason: ${academicPlan.refusalReason}\n`;
        }
      }
      body += `  Has Traveled: ${academicPlan.hasTraveled || 'no'}\n`;
      if (academicPlan.hasTraveled === 'yes' && academicPlan.travelDetails) {
        body += `    Travel Details: ${academicPlan.travelDetails}\n`;
      }
      body += `  Has Petition: ${academicPlan.hasPetition || 'no'}\n`;
      if (academicPlan.hasPetition === 'yes' && academicPlan.petitionDetails) {
        body += `    Petition Details: ${academicPlan.petitionDetails}\n`;
      }
    }
    
    // Additional Details
    if (academicPlan.additionalDetails) {
      body += `\nAdditional Details: ${academicPlan.additionalDetails}\n`;
    }
  }
  
  // Footer
  body += "\n\n────────────────────────────────────────\n";
  body += "TIP: To organize these emails, create a Gmail filter:\n";
  body += "1. Click the three dots (⋮) on this email\n";
  body += "2. Select \"Filter messages like this\"\n";
  body += "3. Click \"Create filter\"\n";
  body += `4. Check "Apply the label" and select/create "Wings Enquiry Mail"\n`;
  body += "5. Click \"Create filter\"\n";
  
  return body;
};

// Send registration notification emails (Universal - Pre-formatted)
// Formats complete email body in frontend and sends to universal Firebase Function
export const sendRegistrationNotificationEmailsUniversal = async (userData: any, academicPlan?: any): Promise<boolean> => {
  try {
    // console.log('📧 [emailService] Starting email notification...');
    // console.log('📧 [emailService] User data:', userData);
    
    // // Get counselor emails if branch is selected
    const recipientEmails: string[] = [];
    
    // if (userData.isEECAgent === 'Yes' && userData.branch) {
    //   console.log('📧 [emailService] User selected a branch:', userData.branch);
    //   const counselorEmails = getCounselorEmailsFromBranch(userData.branch);
    //   console.log('📧 [emailService] Counselor emails from branch:', counselorEmails);
    //   recipientEmails.push(...counselorEmails);
    // } else {
    //   console.log('📧 [emailService] No branch selected (isEECAgent:', userData.isEECAgent, ', branch:', userData.branch, ')');
    // }
    
    // Always add the admin emails
    const adminEmails = [     
      'info@wingsinstitute.com',
    ];
    
    recipientEmails.push(...adminEmails);
    // console.log('📧 [emailService] Admin emails added:', adminEmails);
    
    // Remove duplicates
    const uniqueEmails = [...new Set(recipientEmails)];
    // console.log('📧 [emailService] Final recipient list (after deduplication):', uniqueEmails);
    
    if (uniqueEmails.length === 0) {
      console.log('❌ [emailService] No recipients found, aborting email send');
      return false;
    }
    
    // // Get target country for dynamic subject
    // const targetCountry = String(userData.targetCountry || 'USA').trim();
    // console.log('📧 [emailService] Target country:', targetCountry);
    
    // Build complete email body (all formatting done in frontend)
    const emailBody = buildCompleteEmailBody(userData, academicPlan);
    // console.log('📧 [emailService] Email body prepared (length:', emailBody.length, 'chars)');
    
    // Build subject line
    const subject = `[Wings Institute] New User Inquiry - Wings Institute`;
    // console.log('📧 [emailService] Email subject:', subject);
    
    // Send email via Universal Firebase Cloud Function
    try {
      // console.log('📨 [emailService] Calling Firebase Cloud Function:', SEND_REGISTRATION_EMAILS_UNIVERSAL_URL);
      const response = await fetch(SEND_REGISTRATION_EMAILS_UNIVERSAL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: uniqueEmails,
          emailBody: emailBody,
          subject: subject,
        }),
      });
      
      // console.log('📨 [emailService] Response status:', response.status, response.statusText);
      const data = await response.json();
      // console.log('📨 [emailService] Response data:', data);
      
      if (data.success === true) {
        // console.log('✅ [emailService] Email sent successfully!');
        return true;
      } else {
        console.log('⚠️ [emailService] Email send returned false:', data);
        return false;
      }
    } catch (error: any) {
      console.error('❌ [emailService] Error sending registration emails:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ [emailService] Outer catch - error:', error);
    // Don't throw error - registration should succeed even if email fails
    return false;
  }
};

// Send quick inquiry notification emails
export const sendQuickInquiryEmails = async (inquiryData: any): Promise<boolean> => {
  try {
    // console.log('📧 [emailService] Starting quick inquiry email notification...');
    // console.log('📧 [emailService] Inquiry data:', inquiryData);
    
    // Admin emails
    const adminEmails = [
      'info@wingsinstitute.com',
    ];
    
    const uniqueEmails = [...new Set(adminEmails)];
    // console.log('📧 [emailService] Recipient list:', uniqueEmails);
    
    if (uniqueEmails.length === 0) {
      console.log('❌ [emailService] No recipients found, aborting email send');
      return false;
    }
    
    // Build email body for quick inquiry
    const registrationDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata'
    });
    
    let emailBody = `New Quick Inquiry - Wings Institute\n\n`;
    emailBody += "QUICK INQUIRY DETAILS\n";
    emailBody += "────────────────────────────────────────\n";
    emailBody += `Name: ${inquiryData.name || 'N/A'}\n`;
    emailBody += `Phone: ${inquiryData.phone || 'N/A'}\n`;
    emailBody += `Message: ${inquiryData.message || 'N/A'}\n`;
    emailBody += `Inquiry Date: ${registrationDate}\n\n`;
    emailBody += "────────────────────────────────────────\n";
    emailBody += "TIP: To organize these emails, create a Gmail filter:\n";
    emailBody += "1. Click the three dots (⋮) on this email\n";
    emailBody += "2. Select \"Filter messages like this\"\n";
    emailBody += "3. Click \"Create filter\"\n";
    emailBody += `4. Check "Apply the label" and select/create "Wings Quick Inquiry"\n`;
    emailBody += "5. Click \"Create filter\"\n";
    
    // console.log('📧 [emailService] Email body prepared (length:', emailBody.length, 'chars)');
    
    // Build subject line
    const subject = `[Wings Institute] New Quick Inquiry - ${inquiryData.name || 'Guest'}`;
    // console.log('📧 [emailService] Email subject:', subject);
    
    // Send email via Universal Firebase Cloud Function
    try {
      // console.log('📨 [emailService] Calling Firebase Cloud Function:', SEND_REGISTRATION_EMAILS_UNIVERSAL_URL);
      const response = await fetch(SEND_REGISTRATION_EMAILS_UNIVERSAL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: uniqueEmails,
          emailBody: emailBody,
          subject: subject,
        }),
      });
      
      // console.log('📨 [emailService] Response status:', response.status, response.statusText);
      const data = await response.json();
      // console.log('📨 [emailService] Response data:', data);
      
      if (data.success === true) {
        // console.log('✅ [emailService] Quick inquiry email sent successfully!');
        return true;
      } else {
        // console.log('⚠️ [emailService] Email send returned false:', data);
        return false;
      }
    } catch (error: any) {
      console.error('❌ [emailService] Error sending quick inquiry emails:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ [emailService] Outer catch - error:', error);
    // Don't throw error - inquiry should succeed even if email fails
    return false;
  }
};

// Send franchise application notification emails
export const sendFranchiseApplicationEmails = async (applicationData: any): Promise<boolean> => {
  try {
    // console.log('📧 [emailService] Starting franchise application email notification...');
    // console.log('📧 [emailService] Application data:', applicationData);
    
    // Admin emails
    const adminEmails = [
      'mili@wingsinstitute.com',
    ];
    
    const uniqueEmails = [...new Set(adminEmails)];
    // console.log('📧 [emailService] Recipient list:', uniqueEmails);
    
    if (uniqueEmails.length === 0) {
      console.log('❌ [emailService] No recipients found, aborting email send');
      return false;
    }
    
    // Build email body for franchise application
    const applicationDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata'
    });
    
    let emailBody = `New Franchise Application - Wings Institute\n\n`;
    emailBody += "FRANCHISE APPLICATION DETAILS\n";
    emailBody += "────────────────────────────────────────\n";
    emailBody += `Full Name: ${applicationData.name || 'N/A'}\n`;
    emailBody += `City / State: ${applicationData.cityState || 'N/A'}\n`;
    emailBody += `Phone Number: +${applicationData.phone || 'N/A'}\n`;
    emailBody += `Email Address: ${applicationData.email || 'N/A'}\n`;
    emailBody += `Investment Capacity: ${applicationData.investmentCapacity || 'N/A'}\n`;
    emailBody += `Current Business / Experience: ${applicationData.businessExperience || 'N/A'}\n`;
    emailBody += `Application Date: ${applicationDate}\n\n`;
    emailBody += "────────────────────────────────────────\n";
    emailBody += "TIP: To organize these emails, create a Gmail filter:\n";
    emailBody += "1. Click the three dots (⋮) on this email\n";
    emailBody += "2. Select \"Filter messages like this\"\n";
    emailBody += "3. Click \"Create filter\"\n";
    emailBody += `4. Check "Apply the label" and select/create "Wings Franchise Applications"\n`;
    emailBody += "5. Click \"Create filter\"\n";
    
    // console.log('📧 [emailService] Email body prepared (length:', emailBody.length, 'chars)');
    
    // Build subject line
    const subject = `[Wings Institute] New Franchise Application - ${applicationData.name || 'Guest'} - ${applicationData.cityState || 'N/A'}`;
    // console.log('📧 [emailService] Email subject:', subject);
    
    // Send email via Universal Firebase Cloud Function
    try {
      // console.log('📨 [emailService] Calling Firebase Cloud Function:', SEND_REGISTRATION_EMAILS_UNIVERSAL_URL);
      const response = await fetch(SEND_REGISTRATION_EMAILS_UNIVERSAL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: uniqueEmails,
          emailBody: emailBody,
          subject: subject,
        }),
      });
      
      // console.log('📨 [emailService] Response status:', response.status, response.statusText);
      const data = await response.json();
      // console.log('📨 [emailService] Response data:', data);
      
      if (data.success === true) {
        // console.log('✅ [emailService] Franchise application email sent successfully!');
        return true;
      } else {
        // console.log('⚠️ [emailService] Email send returned false:', data);
        return false;
      }
    } catch (error: any) {
      console.error('❌ [emailService] Error sending franchise application emails:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ [emailService] Outer catch - error:', error);
    // Don't throw error - application should succeed even if email fails
    return false;
  }
};

// Send scholarship application notification emails
export const sendScholarshipApplicationEmails = async (scholarshipData: {
  name: string;
  phone: string;
  course: string;
}): Promise<boolean> => {
  try {
    // Admin emails
    const adminEmails = [
      'info@wingsinstitute.com',
    ];
    
    const uniqueEmails = [...new Set(adminEmails)];
    
    if (uniqueEmails.length === 0) {
      console.log('❌ [emailService] No recipients found, aborting email send');
      return false;
    }
    
    // Build email body for scholarship application
    const applicationDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata'
    });
    
    // Map course value to readable label
    const courseLabels: Record<string, string> = {
      'air_hostess': 'Air Hostess',
      'airport_management': 'Airport Management',
      'hotel_management': 'Hotel Management',
      'cooking_baking': 'Cooking & Baking',
      'travel_tourism': 'Travel & Tourism',
    };
    
    const courseLabel = courseLabels[scholarshipData.course] || scholarshipData.course;
    
    let emailBody = `New Scholarship Test Application - Wings Institute\n\n`;
    emailBody += "SCHOLARSHIP APPLICATION DETAILS\n";
    emailBody += "────────────────────────────────────────\n";
    emailBody += `Name: ${scholarshipData.name || 'N/A'}\n`;
    emailBody += `Phone: +91 ${scholarshipData.phone || 'N/A'}\n`;
    emailBody += `Interested Course: ${courseLabel}\n`;
    emailBody += `Application Date: ${applicationDate}\n\n`;
    emailBody += "────────────────────────────────────────\n";
    emailBody += "TIP: To organize these emails, create a Gmail filter:\n";
    emailBody += "1. Click the three dots (⋮) on this email\n";
    emailBody += "2. Select \"Filter messages like this\"\n";
    emailBody += "3. Click \"Create filter\"\n";
    emailBody += `4. Check "Apply the label" and select/create "Wings Scholarship Applications"\n`;
    emailBody += "5. Click \"Create filter\"\n";
    
    // Build subject line
    const subject = `[Wings Institute] New Scholarship Application - ${scholarshipData.name || 'Guest'} - ${courseLabel}`;
    
    // Send email via Universal Firebase Cloud Function
    try {
      const response = await fetch(SEND_REGISTRATION_EMAILS_UNIVERSAL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: uniqueEmails,
          emailBody: emailBody,
          subject: subject,
        }),
      });
      
      const data = await response.json();
      
      if (data.success === true) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.error('❌ [emailService] Error sending scholarship application emails:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ [emailService] Outer catch - error:', error);
    return false;
  }
};

// Send student login notification emails
export const sendStudentLoginEmails = async (studentData: any): Promise<boolean> => {
  try {
    // console.log('📧 [emailService] Starting student login email notification...');
    // console.log('📧 [emailService] Student data:', studentData);
    
    // Admin emails
    const adminEmails = [
      'info@wingsinstitute.com',
    ];
    
    const uniqueEmails = [...new Set(adminEmails)];
    // console.log('📧 [emailService] Recipient list:', uniqueEmails);
    
    if (uniqueEmails.length === 0) {
      console.log('❌ [emailService] No recipients found, aborting email send');
      return false;
    }
    
    // Build email body for student login
    const loginDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata'
    });
    
    let emailBody = `New Student Login - Wings Institute\n\n`;
    emailBody += "STUDENT LOGIN DETAILS\n";
    emailBody += "────────────────────────────────────────\n";
    emailBody += `Name: ${studentData.name || 'N/A'}\n`;
    emailBody += `Phone: ${studentData.phone || 'N/A'}\n`;
    emailBody += `Email: ${studentData.email || 'N/A'}\n`;
    emailBody += `City: ${studentData.city || 'N/A'}\n`;
    emailBody += `State: ${studentData.state || 'N/A'}\n`;
    emailBody += `Interested Course: ${studentData.course || 'N/A'}\n`;
    emailBody += `Tool Accessed: ${studentData.toolName || 'N/A'}\n`;
    emailBody += `Login Date: ${loginDate}\n\n`;
    emailBody += "────────────────────────────────────────\n";
    emailBody += "TIP: To organize these emails, create a Gmail filter:\n";
    emailBody += "1. Click the three dots (⋮) on this email\n";
    emailBody += "2. Select \"Filter messages like this\"\n";
    emailBody += "3. Click \"Create filter\"\n";
    emailBody += `4. Check "Apply the label" and select/create "Wings Student Logins"\n`;
    emailBody += "5. Click \"Create filter\"\n";
    
    // console.log('📧 [emailService] Email body prepared (length:', emailBody.length, 'chars)');
    
    // Build subject line
    const subject = `[Wings Institute] New Student Login - ${studentData.name || 'Guest'} - ${studentData.course || 'N/A'}`;
    // console.log('📧 [emailService] Email subject:', subject);
    
    // Send email via Universal Firebase Cloud Function
    try {
      // console.log('📨 [emailService] Calling Firebase Cloud Function:', SEND_REGISTRATION_EMAILS_UNIVERSAL_URL);
      const response = await fetch(SEND_REGISTRATION_EMAILS_UNIVERSAL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: uniqueEmails,
          emailBody: emailBody,
          subject: subject,
        }),
      });
      
      // console.log('📨 [emailService] Response status:', response.status, response.statusText);
      const data = await response.json();
      // console.log('📨 [emailService] Response data:', data);
      
      if (data.success === true) {
        // console.log('✅ [emailService] Student login email sent successfully!');
        return true;
      } else {
        // console.log('⚠️ [emailService] Email send returned false:', data);
        return false;
      }
    } catch (error: any) {
      console.error('❌ [emailService] Error sending student login emails:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ [emailService] Outer catch - error:', error);
    // Don't throw error - login should succeed even if email fails
    return false;
  }
};

// Send event registration notification emails
export const sendEventRegistrationEmails = async (eventData: any): Promise<boolean> => {
  try {
    const registrationDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata'
    });
    // Admin emails
    const adminEmails = [
      'info@wingsinstitute.com',
    ];
    const uniqueEmails = [...new Set(adminEmails)];
    if (uniqueEmails.length === 0) {
      console.log('❌ [emailService] No recipients found, aborting email send');
      return false;
    }
    let emailBody = `New Event Registration - Wings Institute\n\n`;
    emailBody += "EVENT REGISTRATION DETAILS\n";
    emailBody += "────────────────────────────────────────\n";
    emailBody += `Name: ${eventData.name || 'N/A'}\n`;
    emailBody += `Phone: ${eventData.phone || 'N/A'}\n`;
    emailBody += `Email: ${eventData.email || 'N/A'}\n`;
    emailBody += `Qualification: ${eventData.qualification || 'N/A'}\n`;
    emailBody += `Event: ${eventData.event || 'N/A'}\n`;
    emailBody += `Event Date: ${eventData.event_date || 'N/A'}\n`;
    emailBody += `Event Time: ${eventData.event_time || 'N/A'}\n`;
    emailBody += `Event Category: ${eventData.event_category || 'N/A'}\n`;
    emailBody += `Event Location: ${eventData.event_location || 'N/A'}\n`;
    emailBody += `Registration Date: ${registrationDate}\n\n`;
    emailBody += "────────────────────────────────────────\n";
    emailBody += "TIP: To organize these emails, create a Gmail filter:\n";
    emailBody += "1. Click the three dots (⋮) on this email\n";
    emailBody += "2. Select \"Filter messages like this\"\n";
    emailBody += "3. Click \"Create filter\"\n";
    emailBody += `4. Check "Apply the label" and select/create "Wings Event Registrations"\n`;
    emailBody += "5. Click \"Create filter\"\n";
    
    // Build subject line
    const subject = `[Wings Institute] New Event Registration - ${eventData.name || 'Guest'} - ${eventData.event || 'N/A'}`;
    // console.log('📧 [emailService] Email subject:', subject);
    
    // Send email via Universal Firebase Cloud Function
    try {
      // console.log('📨 [emailService] Calling Firebase Cloud Function:', SEND_REGISTRATION_EMAILS_UNIVERSAL_URL);
    const response = await fetch(SEND_REGISTRATION_EMAILS_UNIVERSAL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipients: uniqueEmails,
        emailBody: emailBody,
        subject: subject,
      }),
    });
    const data = await response.json();
    if (data.success === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('❌ [emailService] Error sending event registration emails:', error);
    return false;
  }
} catch (error) {
  console.error('❌ [emailService] Outer catch - error:', error);
  return false;
}
}


export const sendEventRegistrationEmailsToUser = async (eventData: any): Promise<boolean> => {
  try {
    // Validate email exists
    if (!eventData.email || eventData.email.trim() === '') {
      // console.log('❌ [emailService] No user email provided, aborting email send to user');
      return false;
    }

    const registrationDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });
    
    // User email only
    const userEmails = [eventData.email.trim()];
    const userEmail = [...new Set(userEmails)];
    
    // console.log('📧 [emailService] Attempting to send email to user:', userEmail[0]);
    
    if (userEmail.length === 0) {
      console.log('❌ [emailService] No recipients found after validation, aborting email send');
      return false;
    }
    
    // Format date as "12 January 2026"
    const formatDisplayDate = (dateStr: string): string => {
      try {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
      } catch {
        return dateStr;
      }
    };
    
    // Format time as "11 AM" or "2 PM"
    const formatDisplayTime = (timeStr: string): string => {
      try {
        if (!timeStr) return 'N/A';
        const [hours, minutes] = timeStr.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;
        if (minutes === 0) {
          return `${hour12} ${period}`;
        }
        return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
      } catch {
        return timeStr;
      }
    };
    
    const formattedDate = formatDisplayDate(eventData.event_date);
    const formattedTime = formatDisplayTime(eventData.event_time);
    
    // Generate Google Calendar URL with full event details
    const generateCalendarUrl = (): string => {
      try {
        const eventDate = eventData.event_date || '';
        const eventTime = eventData.event_time || '10:00:00';
        const eventTitle = eventData.event_title || eventData.event || 'Wings Institute Event';
        const durationMin = eventData.duration_min || 120; // Use event duration or default 2 hours
        
        if (!eventDate) return '';
        
        // Parse and format dates
        const eventDateTime = new Date(`${eventDate}T${eventTime}`);
        const endDateTime = new Date(eventDateTime.getTime() + durationMin * 60000);
        
        const formatDate = (date: Date): string => {
          const pad = (n: number) => n.toString().padStart(2, '0');
          return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
        };
        
        const startStr = formatDate(eventDateTime);
        const endStr = formatDate(endDateTime);
        
        // Format learning outcomes for calendar
        let learningOutcomesText = '';
        if (eventData.learning_outcomes) {
          if (Array.isArray(eventData.learning_outcomes)) {
            learningOutcomesText = eventData.learning_outcomes.map((o: string) => `• ${o}`).join('\n');
          } else {
            learningOutcomesText = eventData.learning_outcomes;
          }
        }
        
        const title = encodeURIComponent(eventTitle);
        const location = encodeURIComponent('Wings Institute, 2nd Floor RG Square, 14 Nutan Bharat Society, Opp. Nutan Bharat Club, Alkapuri, Vadodara, Gujarat 390007');
        const details = encodeURIComponent(
          `🎓 ${eventTitle}\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `📝 ABOUT THIS EVENT:\n` +
          `${eventData.event_description || eventData.description || 'Join us for this exciting workshop at Wings Institute!'}\n\n` +
          `🎯 CATEGORY: ${eventData.event_category || 'Workshop'}\n` +
          `⏱️ DURATION: ${durationMin} minutes\n` +
          `📍 VENUE: ${eventData.event_location || 'Wings Institute Vadodara'}\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `📚 WHAT YOU WILL LEARN:\n` +
          `${learningOutcomesText || '• Industry-relevant skills\n• Hands-on practical experience\n• Expert guidance'}\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `⚠️ IMPORTANT NOTES:\n` +
          `• Please arrive 15 minutes before the event\n` +
          `• Bring a valid ID proof\n` +
          `• Dress code: Smart Casual\n` +
          `• Free entry with certificate\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `📞 Contact: +91-875 875 4444\n` +
          `📧 Email: info@wingsinstitute.com\n` +
          `🌐 Website: https://wingsinstitute.com\n` +
          `📍 Google Maps: https://maps.app.goo.gl/Fwh7RzQxuWis5A159`
        );
        
        return `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}&ctz=Asia/Kolkata`;
      } catch (error) {
        console.error('Error generating calendar URL:', error);
        return '';
      }
    };
    
    const calendarUrl = generateCalendarUrl();

    // HTML Email Body with styled buttons
    let emailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; max-width: 600px;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #667eea; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">🎉 Registration Confirmed!</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0;">
              
              <p style="font-size: 16px; margin: 0 0 20px 0; color: #333333;">
                Thank you for registering for the event at <strong>Wings Institute</strong> - <strong>Career Guidance Workshop</strong>
              </p>
              
              <p style="color: #666666; margin: 0 0 20px 0;">We look forward to seeing you at the event!</p>
              
              <!-- Event Details Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-left: 4px solid #667eea; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; color: #667eea; font-size: 18px;">📋 Event Details</h3>
                    <p style="margin: 8px 0; color: #333333;"><strong>📅 Date:</strong> ${formattedDate}</p>
                    <p style="margin: 8px 0; color: #333333;"><strong>🕐 Time:</strong> ${formattedTime} IST</p>
                    <p style="margin: 8px 0; color: #333333;"><strong>⏱️ Duration:</strong> ${eventData.duration_min || 120} minutes</p>
                    <p style="margin: 8px 0; color: #333333;"><strong>📍 Venue:</strong> ${eventData.event_location || 'Wings Institute Vadodara'}</p>
                    <p style="margin: 8px 0; color: #333333;"><strong>🎯 Category:</strong> ${eventData.event_category || 'Workshop'}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Event Description -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0f4ff; border: 1px solid #667eea; margin: 20px 0; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; color: #667eea; font-size: 18px;">📝 About This Event</h3>
                    <p style="margin: 0; color: #333333; line-height: 1.6;">
                      ${eventData.event_description || eventData.description || 'Join us for this exciting workshop at Wings Institute where you will gain practical skills and industry knowledge from expert trainers.'}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- What You Will Learn -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #e8f5e9; border-left: 4px solid #4caf50; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; color: #2e7d32; font-size: 18px;">📚 What You Will Learn</h3>
                    ${(() => {
                      if (eventData.learning_outcomes) {
                        if (Array.isArray(eventData.learning_outcomes)) {
                          return `<ul style="margin: 0; padding-left: 20px; color: #333333;">
                            ${eventData.learning_outcomes.map((outcome: string) => `<li style="margin-bottom: 8px; line-height: 1.5;">${outcome}</li>`).join('')}
                          </ul>`;
                        } else {
                          return `<p style="margin: 0; color: #333333; line-height: 1.6;">${eventData.learning_outcomes}</p>`;
                        }
                      }
                      return `<ul style="margin: 0; padding-left: 20px; color: #333333;">
                        <li style="margin-bottom: 8px;">Industry-relevant practical skills</li>
                        <li style="margin-bottom: 8px;">Hands-on training experience</li>
                        <li style="margin-bottom: 8px;">Expert guidance from professionals</li>
                      </ul>`;
                    })()}
                  </td>
                </tr>
              </table>
              
              <!-- Event Highlights -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fff8e1; border-left: 4px solid #ff9800; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; color: #e65100; font-size: 18px;">✨ Event Highlights</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 5px 0; color: #333333;">✅ <strong>Free Entry</strong> - No registration fee</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #333333;">👨‍🏫 <strong>Expert Trainers</strong> - Learn from industry professionals</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #333333;">🏢 <strong>World-Class Facilities</strong> - Experience our state-of-the-art infrastructure</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Add to Calendar Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td align="center" style="padding: 0 0 15px 0;">
                    <p style="color: #666666; margin: 0;">📆 <strong>Don't miss this event!</strong></p>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="background-color: #667eea; padding: 15px 30px;">
                          <a href="${calendarUrl}" target="_blank" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; display: block;">📅 Add to Google Calendar</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Registration Details -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border: 1px solid #e0e0e0; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 18px;">👤 Your Registration</h3>
                    <p style="margin: 8px 0; color: #333333;"><strong>Name:</strong> ${eventData.name || 'N/A'}</p>
                    <p style="margin: 8px 0; color: #333333;"><strong>Email:</strong> ${eventData.email || 'N/A'}</p>
                    <p style="margin: 8px 0; color: #333333;"><strong>Phone:</strong> ${eventData.phone || 'N/A'}</p>
                    <p style="margin: 8px 0; color: #333333;"><strong>Qualification:</strong> ${eventData.qualification || 'N/A'}</p>
                    <p style="margin: 8px 0; color: #888888; font-size: 12px;"><strong>Registered on:</strong> ${registrationDate}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Important Notes -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fff3cd; border-left: 4px solid #ffc107; margin: 20px 0;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <h4 style="margin: 0 0 10px 0; color: #856404; font-size: 16px;">⚠️ Important Notes</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #856404;">
                      <li style="margin-bottom: 5px;">Please arrive 15 minutes before the event start time</li>
                      <li style="margin-bottom: 5px;">Bring a valid ID proof</li>
                      <li>Dress code: Smart Casual</li>
                    </ul>
                  </td>
                </tr>
              </table>
              
              <!-- Location & Maps Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border: 1px solid #e0e0e0; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 18px;">📍 Venue Location</h3>
                    <p style="margin: 8px 0; color: #666666; line-height: 1.6;">
                      Wings Institute for Air Hostess and Hotel Management Training<br>
                      2nd Floor, RG Square<br>
                      14, Nutan Bharat Society<br>
                      Opposite Nutan Bharat Club<br>
                      Alkapuri, Vadodara, Gujarat
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 15px;">
                      <tr>
                        <td align="center">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td align="center" style="background-color: #34a853; padding: 12px 25px;">
                                <a href="https://maps.app.goo.gl/Fwh7RzQxuWis5A159" target="_blank" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 14px; display: block;">📍 Open in Google Maps</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Contact Info -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top: 1px solid #e0e0e0; margin-top: 20px;">
                <tr>
                  <td align="center" style="padding: 20px;">
                    <p style="color: #666666; margin: 0 0 10px 0;">For any queries, contact us at:</p>
                    <p style="margin: 5px 0; color: #333333;"><strong>📞</strong> <a href="tel:+918758754444" style="color: #667eea; text-decoration: none;">+91-875 875 4444</a></p>
                    <p style="margin: 5px 0; color: #333333;"><strong>📧</strong> <a href="mailto:info@wingsinstitute.com" style="color: #667eea; text-decoration: none;">info@wingsinstitute.com</a></p>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #333333; padding: 20px; text-align: center;">
              <p style="color: #ffffff; margin: 0; font-size: 14px;">Thank you for choosing <strong>Wings Institute</strong>! ✈️</p>
              <p style="color: #888888; margin: 10px 0 0 0; font-size: 12px;">© 2026 Wings Institute. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;


    // Build subject line
    const subject = `[Wings Institute] Event Registration Confirmed - ${eventData.event_title || eventData.event || 'Event'}`;
    
    console.log('📨 [emailService] Sending to Firebase Cloud Function with payload:', {
      recipients: userEmail,
      subject: subject,
      emailBodyLength: emailBody.length
    });
    
    // Send email via Universal Firebase Cloud Function
    try {
    const response = await fetch(SEND_EVENT_REGISTRATION_EMAILS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipients: userEmail,
        emailBody: emailBody,
        subject: subject,
      }),
    });
    
    if (!response.ok) {
      console.error('❌ [emailService] HTTP error:', response.status, response.statusText);
      return false;
    }
    
    const data = await response.json();
    console.log('📬 [emailService] Firebase response for user email:', data);
    
    if (data.success === true) {
      console.log('✅ [emailService] Email sent successfully to user:', userEmail[0]);
      return true;
    } else {
      console.error('❌ [emailService] Email send failed to user. Response:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ [emailService] Error sending event registration emails:', error);
    return false;
  }
} catch (error) {
  console.error('❌ [emailService] Outer catch - error:', error);
  return false;
}
}




