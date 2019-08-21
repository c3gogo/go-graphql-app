package queries

import (
	"context"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"

	"app/data"
	types "app/types"
)

type todoStruct struct {
	NAME        string `json:"name"`
	DESCRIPTION string `json:"description"`
}

var GetNotTodos = &graphql.Field{
	Type:        graphql.NewList(types.NotTodo),
	Description: "Get all not todos",
	Resolve: func(params graphql.ResolveParams) (interface{}, error) {
		notTodoCollection := mongo.Client.Database("not-todo-app").Collection("Not_Todos")
		todos, err := notTodoCollection.Find(context.Background(), bson.D{{}}, nil)
		if err != nil {
			panic(err)
		}

		var todoList []*todoStruct
		for todos.Next(context.Background()) {
			var todo todoStruct

			err := todos.Decode(&todo)
			if err != nil {
				panic(err)
			}
			todoList = append(todoList, &todo)
		}
		return todoList, nil
	},
}
