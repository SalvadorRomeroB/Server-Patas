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

## Server Express

> LIGA: https://patas-app.herokuapp.com

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

### Hospitals CRUD

> GET: https://patas-app.herokuapp.com/api/test/hospital

> Body:

    {
        "username": "Juan",
        "password": "1234",
    }

> POST: https://patas-app.herokuapp.com/api/test/hospital

> Body:

    {
        "name": "Hospital los Angeles"
    }

> Delete: https://patas-app.herokuapp.com/api/test/hospital/:id

> Body:

    {
        "name": "Hospital los Angeles"
    }

> PUT: https://patas-app.herokuapp.com/api/test/hospital/:id

> Body:

    {
        "name": "Cima"
    }
