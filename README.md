# Titan Recommendation Algorithm
The Titan Recommendation Algorithm is a powerful and flexible video recommendation system designed to generate personalized video feeds based on user preferences, behaviors, and interactions. This package leverages a modular design, worker threads, and a robust scoring system to deliver highly relevant content to users.

![npm](https://img.shields.io/npm/v/titan-recommendation-algorithm)
![license](https://img.shields.io/npm/l/titan-recommendation-algorithm)
![downloads](https://img.shields.io/npm/dt/titan-recommendation-algorithm)


## Features
User-Centric Recommendations: Personalize feeds using user preferences, location, feedback, and interaction history.
Dynamic Scoring: Calculate video relevance based on engagement, novelty, social proof, and more.
Modular Configuration: Easily customize weights, thresholds, and scoring logic through the Config interface.
Worker Threads: Efficiently process large datasets with asynchronous workers.
Diversity Support: Promote diverse recommendations by penalizing overused tags or creators.
## Installation
To install the package, use npm:

```bash
npm install titan-recommendation-algorithm
```

## Usage
Generate a Personalized Feed
```typescript
import { generateFeed } from 'titan-recommendation-algorithm'; 
import { UserPreferences, UserData, Video } from './types';

const userPreferences: UserPreferences = { 
  preferredTags: ['comedy', 'education'], 
  minDuration: 10, 
  maxDuration: 300, 
};

const userData: UserData = { 
  userLocation: 'New York', 
  rewatchedVideos: ['video1'], 
};

const videos: Video[] = [ 
  { 
    id: 'video1', 
    tags: ['comedy'], 
    duration: 120, 
    views: 1000, 
    engagementRate: 0.8, 
    uploadDate: '2023-12-01' 
  }, { 
    id: 'video2', 
    tags: ['sports'], 
    duration: 90, 
    views: 2000, 
    engagementRate: 0.6, 
    uploadDate: '2023-12-02' 
  }, 
];

generateFeed(
    userPreferences, 
    userData, 
    videos
  ).then((feed) => { 
      console.log(feed)
  }); // Outputs an array of sorted video IDs });
```

## Update User Feedback

```typescript
import { updateFeedback } from 'titan-recommendation-algorithm'; import { UserData } from './types';

const userData: UserData = { 
  rewatchedVideos: ['video1'], 
  feedback: { video1: 4 }, 
};

const updatedData = updateFeedback(userData, 'video2', 5); console.log(updatedData.feedback); // Outputs: { video1: 4, video2: 5 }
```

## Adjust Configuration
```typescript
import { updateConfig, getConfig } from 'titan-recommendation-algorithm';

updateConfig({ noveltyScoreWeight: 0.5 }); console.log(getConfig().noveltyScoreWeight); // Outputs: 0.5
```
## Documentation
For detailed documentation on each function, interface, and configuration option, refer to the TSDoc comments in the source files.

## Contributing
We welcome contributions! See the CONTRIBUTING.md file for more details.

## License
This project is licensed under the MIT License. See the LICENSE file for details.