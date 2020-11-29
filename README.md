# Server-Patas

### Predict Image

> POST: https://colab-model.herokuapp.com/prediction

> Headers:

    {
        "Content-Type": "application/json"
    }

> Body:

    {
        "data": image_base_64
    }

> Response:

    category ("1", "2", "3")

---

## Express Server

> Link: https://patas-app.herokuapp.com

## Doctor

### Sign up Doctor

> POST: https://patas-app.herokuapp.com/api/admin/signup

> Headers:

    {
        x-access-token: Pos aqui le pones el token del admin xd
    }

> Body:

    {
        "username": "Nose",
        "email": "Nose@hotmail.com",
        "password": "1234",
        "hospital": "Cima"
    }

### Sign in Doctor

> POST: https://patas-app.herokuapp.com/api/doctor/signin

> Body:

    {
        "username": "Juan",
        "password": "1234",
    }

### Update email or username of Doctor

> POST: https://patas-app.herokuapp.com/api/doctor/update/:id

> Headers:

    {
        x-access-token: doctor's token
    }

> Body:

#### You can modify email and username

#### You can place as parameters username and email, or only username or email.

    {
        "username": "Juan",
        "email": "juan@hotmail.com",
    }

    or

    {
        "username": "Juan",
    }

    or

    {
        "email": "juan@hotmail.com",
    }

app.put("/api/doctor/update/password/:id", authJwt.verifyToken, auth.updatePassword)

### Update password of Doctor

> POST: https://patas-app.herokuapp.com/api/doctor/update/password/:id

> Headers:

    {
        x-access-token: doctor's token
    }

> Body:

    {
        "password": "1234",
        "newPassword": "4321"
    }

## Admin

### Hospitals CRUD

> Headers:

#### All hospitals requests should have this header with an admin token

    {
        x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzMxMjdjNmYxZWQ0MWRjNGFjNmRmYiIsImlhdCI6MTYwNjYxOTkzOSwiZXhwIjoxNjA2NzA2MzM5fQ.baWgAmQf0VPO0gMzu_2ipJwM6g3l1BOHN5X_ZW8Ejrc
    }

> GET: https://patas-app.herokuapp.com/api/hospital

> POST: https://patas-app.herokuapp.com/api/hospital

> Body:

    {
        "name": "Hospital los Angeles"
    }

> Delete: https://patas-app.herokuapp.com/api/hospital/:id

> Body:

    {
        "name": "Hospital los Angeles"
    }

> PUT: https://patas-app.herokuapp.com/api/hospital/:id

> Body:

    {
        "name": "Cima"
    }

## Admin Routes

### Sign in Admin

> POST: https://patas-app.herokuapp.com/api/auth/signin

> Body:

    {
        "username": "Salvador",
        "password": "1234",
    }
