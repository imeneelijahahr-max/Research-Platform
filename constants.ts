import { Article } from './types';

export const OWNER_NAME = "Imene Ahmed Omar";
export const OWNER_TITLE = "Medical Researcher & Specialist";
// Simple hardcoded password for demonstration purposes. 
// In a real backend app, this would be handled via secure API.
export const OWNER_PASSWORD = "12345"; 

export const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Advancements in Pediatric Cardiology: A 5-Year Study',
    authors: 'Imene Ahmed Omar, Dr. Sarah Bennett',
    date: '2023-10-15',
    views: 1250,
    content: `Cardiovascular diseases in pediatric patients present unique challenges that differ significantly from adult cardiology. Over the past five years, we have conducted an extensive observational study across three major teaching hospitals to analyze the efficacy of non-invasive diagnostic tools in early detection of congenital heart defects (CHDs).

    The methodology involved tracking 500 patients aged 0-12 years. We utilized high-resolution echocardiography alongside genetic screening markers. The results indicate a 15% increase in early detection rates when genetic screening is combined with traditional imaging techniques. 
    
    Furthermore, post-operative recovery times have shown a statistically significant decrease when minimally invasive catheterization procedures are employed compared to traditional open-heart surgeries. This paper discusses the detailed statistical analysis, patient outcomes, and proposes a new protocol for initial screening in neonates presenting with murmurs.
    
    Key findings include:
    1. Correlation between specific genetic markers and CHD severity.
    2. Reduced hospital stay duration by an average of 3 days for catheterization patients.
    3. Long-term follow-up data suggesting improved quality of life scores.
    
    Future research should focus on longitudinal studies extending into adulthood to monitor the durability of these interventions. This study serves as a foundational pillar for updating current pediatric cardiac care guidelines.`
  },
  {
    id: '2',
    title: 'Neurological Implications of Long-COVID in Adolescents',
    authors: 'Imene Ahmed Omar',
    date: '2024-02-10',
    views: 890,
    content: `As the global pandemic subsides, the lingering effects of SARS-CoV-2, commonly known as Long-COVID, continue to impact various demographics. This research focuses specifically on the adolescent population (ages 13-19) and the neurological manifestations observed post-infection.
    
    Symptoms such as "brain fog", chronic fatigue, and persistent headaches were reported in 22% of the study participants six months after initial recovery. Our team utilized MRI imaging and cognitive behavioral testing to map neurological activity. We observed subtle inflammation in the olfactory bulb and frontal cortex in a subset of patients.
    
    The study aims to differentiate between psychosomatic responses to pandemic stress and physiological changes caused by the virus. Preliminary data suggests a strong physiological component, necessitating targeted rehabilitation programs.
    
    Cognitive therapy combined with low-impact physical rehabilitation has shown promising results in restoring baseline neurological function. We advocate for schools and healthcare providers to recognize these symptoms early to prevent academic and social decline in affected adolescents.`
  }
];