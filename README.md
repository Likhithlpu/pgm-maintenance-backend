# pgm-maintenance-backend

![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg) 
[![GitHub license](https://img.shields.io/github/license/Likhithlpu/pgm-maintenance-backend.svg)](https://github.com/Likhithlpu/pgm-maintenance-backend/blob/main/LICENSE)

This repository contains the backend for the Maintenance Dashboard used for feedback form entries and dynamic dashboard changes.

**Please update the database credentials in the `db.js` before running.**

## Technologies Used

- Database: Postgres
- Backend: Express.js

## Installation and Usage

1. Clone this repository to your local machine:

```bash
git clone https://github.com/Likhithlpu/pgm-maintenance-backend.git
```

2. Navigate to the project directory:

```bash
cd pgm-maintenance-backend
```

3. Install the required dependencies using npm or yarn:

```bash
npm install
```

4. Update the database credentials in `db.js`.

5. Start the server:

```bash
npm start
```

The server should now be running and accessible at `http://localhost:5002`.

## API Endpoints

- `/complaints`: Use this endpoint to store complaints in the database. Send a POST request with the required data.
- `/status`: Use this endpoint to retrieve the status from the database. Send a GET request with the `nodeid` parameter.

## Contributing

If you'd like to contribute to this project, please follow the standard GitHub fork and pull request workflow.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
