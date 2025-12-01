# Where in the World?

## Overview
This is a interactive country explorer built with TypeScript, Bootstrap and the REST Countries API. We can search for countries, filterby region, and explore detailed information about every nation.

![alt text](<Screenshot 2025-11-30 at 4.48.32 PM-1.png>)
![alt text](<Screenshot 2025-11-30 at 4.48.39 PM.png>)

## Features

1. Real- time Search - We can search countries by name or the native name

2. Region Filter - We can filter the countries by continents

3. Border Countries - When we click on the border countries we can explore neighbouring nations

4. Dark Mode - We can toggle between the light and dark theme which persists in localStarge

5. Offline Fallback - Works with local data when API is unavailable


## Live Demo
https://restapicountry.netlify.app/

## Technologies Used
- TypeScript - Type-safe JavaScript
- Bootstrap 5.3 - Responsive UI framework
- REST Countries API - Country data source
- Font Awesome - Icons
- Google Fonts - Nunito Sans typography

## Issues
CORS Error in Local Development: When using Live Server, the REST Countries API may be blocked by CORS. This is normal! The app automatically falls back to data.json. Once deployed, this issue disappears.

## Reflection
This project was a valuable learning experience in working with external APIs, TypeScript, and modern web development practices. The biggest takeaway was learning to handle real-world challenges like CORS errors, inconsistent API data, and state management without a framework. It learned the importance of proper error handling, type safety, and creating a good user experience even when things go wrong. The project helped  my understanding of TypeScript's benefits and how to structure a clean, maintainable codebase.

## Resources Used
1. REST Countries API Documentation - Primary data source
2. TypeScript Documentation - Type system reference
3. Bootstrap 5 Documentation - UI component library
4. MDN Web Docs - JavaScript and Web APIs reference
5. Frontend Mentor - Project design and requirements
6. Stack Overflow - Community support for troubleshooting
7. TypeScript Handbook - In-depth TypeScript concepts


