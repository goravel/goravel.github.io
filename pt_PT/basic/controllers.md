# Controles

Em vez de definir toda a lógica de processamento de solicitações na forma de um fechamento em uma rota separada, um controlador pode ser usado
para integração. Os controladores são armazenados no diretório `app/http/controller`.

## Definir controladores

O seguinte exemplo é de um controlador básico:

```go
package controllers

import (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"
)

type UserController struct {
  // Dependent services
}

func NewUserController() *UserController{
  return &UserController{
    // Inject services
  }
}

func (r *UserController) Show(ctx http. ontext) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "Hello": "Goravel",
  })
}
```

A rota definida

```go
package routes

import (
  "github.com/goravel/framework/facades"

  "goravel/app/http/controllers"
)

func Api() {
  userController := controllers. ewUserController()
  facades.Route().Get("/{id}", userController.Show)
}
```

### Criar Controlador

```shell
go run . artisan make:controller UserController
go run . artisan make:controller user/UserController
```

## Controles de Recursos

Se você pensar em cada modelo Eloquent em sua aplicação como um "recurso", é típico executar os mesmos conjuntos de
ações contra cada recurso em sua aplicação. Por exemplo, imagine que sua aplicação contém um modelo `Photo` e um modelo
`Movie`. É provável que os usuários possam criar, ler, atualizar ou excluir esses recursos.

Por causa desse caso comum de uso, o roteamento de recurso de Goravel atribui o típico criado, leia, atualiza e exclui ("CRUD")
rotas para um controle com uma única linha de código. To get started, we can use the `make:controller` Artisan command's
`--resource` option to quickly create a controller to handle these actions:

```shell
ir rodar . artísan make:controller --resource PhotoController
```

Este comando irá gerar um controlador em `app/http/controllers/photo_controller.go`. O controlador conterá um método
para cada uma das operações de recursos disponíveis. Em seguida, você pode registrar uma rota de recurso que aponte para o controlador
:

```go
facades.Rote().Resource("fotos", controllers.NewPhotoController())
```

| Verbo        | URI              | Acão        |
| ------------ | ---------------- | ----------- |
| OBTER        | `/fotos`         | Indexação   |
| POSTAR       | `/fotos`         | Armazém     |
| OBTER        | `/fotos/{photo}` | Apresentar  |
| BOTRO/PATCAR | `/fotos/{photo}` | Atualização |
| EXCLUIR      | `/fotos/{photo}` | Destruir    |
