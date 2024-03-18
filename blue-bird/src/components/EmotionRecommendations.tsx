import React from 'react';
import Link from 'next/link';

interface EmotionRecommendationsProps {
  emotion: string;
}

const EmotionRecommendations: React.FC<EmotionRecommendationsProps> = ({ emotion }) => {
  // Define recommendation URLs based on the detected emotion
  const recommendations: Record<string, string[]> = {
    anger: ['https://www.crossway.org/articles/11-passages-to-read-to-help-fight-anger/', 'https://store.faithlafayette.org/browse-by-topic/christian-life-and-growth/emotions-feelings/good-angry/', 'https://www.madebyteachers.com/products/when-sophie-gets-angry-really-really-angry-reading-resources-lessons/'],
    sad: ['https://priyaghose.io/2020-09-19-recommended-reading-when-youre-feeling-sad/', 'https://www.weareteachers.com/books-about-sadness/', 'https://www.betterhealth.vic.gov.au/health/healthyliving/its-okay-to-feel-sad'],
    fear: ['https://www.pegasus.health.nz/your-health/useful-links-resources/reading-in-mind/mental-health-books/anxiety-stress-worry/', 'https://www.robertmellors.notts.sch.uk/wp-content/uploads/sites/3/2020/04/Anxiety-Resource-Pack-2.pdf', 'https://www.cci.health.wa.gov.au/Resources/Looking-After-Yourself/Worry-and-Rumination'],
    confused: ['https://theaggie.org/2023/10/06/are-you-a-twenty-something-like-me-and-confused-about-everything-i-recommend-reading-some-nonfiction/', 'https://www.getepic.com/in/book/59922898/what-i-look-like-when-i-am-confused', 'https://www.commonlit.org/en/texts/the-value-of-being-confused'],
    sorrow: ['https://www.betterup.com/blog/disappointment', 'https://hbr.org/2018/08/dealing-with-disappointment', 'https://www.cbsnews.com/news/books-overcoming-disappointments/'],
    repulsed: ['https://www.goodtherapy.org/blog/disgusted-with-violence-0110121/', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5426557/', 'https://www.amazon.com/Disgusted-Learning-about-Emotions-Gaertner/dp/1503828077'],
  };

  const emotionRecommendations = recommendations[emotion] || [];

  return (
    <div className="flex flex-col space-y-4">

      {emotionRecommendations.length > 0 ? (
        <div className="flex flex-col space-y-2">
          <p className="text-md font-semibold">Here are some helpful tips:</p>
          <ul className="list-disc pl-4">
            {emotionRecommendations.map((recommendation, index) => (
              <li key={index}>
                <Link href={recommendation} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {recommendation}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Have an Ice Cream and dance</p>
      )}
    </div>
  );
};

export default EmotionRecommendations;
