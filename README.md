# Oddle NestJS Challenge
- Name: NGUYEN MANH TRI
- Email: manhtri97@gmail.com
- Where did you apply from: Vietnam

## Disclaimer
Because of the limited time, I was not able to complete all the user stories. Missing features are:
- Retrieve a list of accounts based on created time and/or country
- Generate a login link
- Update conditions for users in Hong Kong and Singapore.

# Getting started
To start this project, you need:
- **Nest CLI**. You can follow [the official docs](https://docs.nestjs.com/cli/overview) to install Nest CLI
- A running **MySQL** server on your machine. You can follow [the official docs](https://dev.mysql.com/doc/refman/5.7/en/installing.html) to install MySQL.

1. Install dependencies
```bash
npm install
```
Run the above command to install the necessary dependencies.

2. Prepare database

Inside your MySQL shell, run the below command to create the `oddle` database and a `users` table with the defined schema:
```bash
source /sql/create_tables.sql
```
Then, run the below command to create some seed data:
```bash
source /sql/seed_data.sql
```

3. Stripe test secret API key
```bash
echo "TEST_SECRET_API_KEY = <your_test_secret_api_key>" > ./config/development.env
```

4. Start the server
```bash
npm run start
```
Your server is running at `localhost:3000`

# Usage
1. Retrieve an account by id
```bash
curl --request GET \
  --url http://localhost:3000/users/:id
```
2. Create an account
```bash
curl --request POST \
  --url http://localhost:3000/users \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "John Doe",
	"display_name": "John",
	"email": "johndoe@mail.com",
	"business_type": "INDIVIDUAL",
	"phone_number": "+123",
	"country": "Hong Kong",
	"payout": 90000
}'
```
This returns:
```json
{
	"name": "John Doe",
	"display_name": "John",
	"email": "johndoe@mail.com",
	"business_type": "INDIVIDUAL",
	"phone_number": "+123",
	"country": "Hong Kong",
	"external_id": "acct_1MvLpiR6HgihwWpC",
	"payout": 90000,
	"id": 25,
	"created_on": "2023-04-10T14:36:42.000Z",
	"status": "PENDING"
}
```
Since this account is created for a user from Hong Kong, a Stripe Connect Account will also be created. You can verify this by calling the Stripe API.
```bash
curl --request GET \
  --url https://api.stripe.com/v1/accounts/:external_id \
  --header 'Authorization: Basic <your_test_secret_api_key>'
```
3. Update an account
```bash
curl --request PATCH \
  --url http://localhost:3000/users/25 \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "John Smith"
}'
```
This returns the account with the fields updated:
```json
{
	"name": "John Smith",
	"display_name": "John",
	"email": "johndoe@mail.com",
	"business_type": "INDIVIDUAL",
	"phone_number": "+123",
	"country": "Hong Kong",
	"external_id": "acct_1MvLpiR6HgihwWpC",
	"payout": 90000,
	"id": 25,
	"created_on": "2023-04-10T14:36:42.000Z",
	"status": "PENDING"
}
```
4. Delete an account

You cannot delete accounts
```bash
curl --request DELETE \
  --url http://localhost:3000/users/25
```
Returns **405 Method Not Allowed**
```json
{
	"message": "DELETE NOT ALLOWED."
}
```

# What can be improved?
1. Finish up the user stories
2. Sanitize the country name before creating account
3. Put the user creation flow in a transaction
4. Use middlewares to sanitize user inputs
5. Write tests for the service
