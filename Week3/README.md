# Week3 User Processing Module

## Overview

This module provides classes and functions for managing user data, including fetching user information from an API, filtering users by age, and generating user greetings.

## Classes

### User

Represents a user with a name and age.

- **Constructor**: `User(name, age)`
  - `name` (string): The user's name.
  - `age` (number): The user's age.
- **Method**: `getGreeting()`
  - Returns a greeting message including the user's name and age.

## Functions

### fetchUserData(url)

Fetches user data from the specified API endpoint.

- **Parameters**:
  - `url` (string): The API endpoint URL.
- **Returns**: A Promise resolving to the user data object.

### filterUsersByAge(users, minAge)

Filters an array of User objects by a minimum age.

- **Parameters**:
  - `users` (User[]): Array of User objects.
  - `minAge` (number): Minimum age to filter.
- **Returns**: Array of User objects whose age is greater than or equal to `minAge`.

## Usage

1. Create User instances.
2. Fetch user data using `fetchUserData`.
3. Filter users with `filterUsersByAge`.
4. Generate greetings with `getGreeting`.

## Example

```javascript
const users = [
    new User('Alice', 25),
    new User('Bob', 19)
];

const adults = filterUsersByAge(users, 21);
adults.forEach(user => {
    console.log(user.getGreeting());
});
```