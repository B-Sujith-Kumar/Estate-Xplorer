# EstateExplorer

## Overview

"EstateExplorer" is an innovative real estate platform designed to cater to the diverse needs of property owners, buyers, and renters. Leveraging the power of the MERN stack (MongoDB, Express.js, React.js, Node.js) and incorporating machine learning capabilities, the platform provides a cutting-edge and versatile solution for managing real estate interactions.

## Features

- Property Listings: Users can create detailed property listings, including essential information such as name, description, address, type, selling/renting status, amenities, and discounted prices.
- Authentication and Authorization: Secure interactions are ensured through robust authentication and authorization processes.
- Advanced Search and Filters: Users can easily find properties using advanced search and filter options.
- Predictive Pricing: Integration of machine learning provides estimated prices for property listings.
- Direct Communication: The platform facilitates direct communication channels for users.
- Firebase Integration: Seamless image management online is achieved through Firebase integration.

## Getting Started

Follow the steps below to set up and run "EstateExplorer."

### Prerequisites

- Node.js and npm installed
- MongoDB installed
- Python installed for running machine learning models (predictor.py)

### Installation

1. Clone the Repository:

```bash
git clone https://github.com/B-Sujith-Kumar/Estate-Xplorer.git
cd EstateExplorer
```
2. Install Dependencies:
```
npm install
```
```
cd client
npm install
```
3. Environment Variables: Create a .env file in the root folder with the following content:
 ```
MONGO=your_mongodb_connection_string
JWT_SECRET = string
```
Run Backend:
```
npm run dev
```
Run Frontend: Open a new terminal window and navigate to the client folder:
```
cd client
npm run dev
```
## Usage
Access the "EstateExplorer" platform by visiting http://localhost:5173 in your web browser.

Additional Information
Predictor Script: The machine learning predictor script (predictor.py) and the pickle file are located in the root folder.

## File Structure:

api: Backend code for the platform.<br />
client: Frontend code for the platform.<br />
predictor.py: Machine learning predictor script.<br />
pickle_file: Pickle file for machine learning model.<br />

## License
This project is licensed under the MIT License.
