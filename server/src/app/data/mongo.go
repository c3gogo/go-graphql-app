package mongo

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
)

var clientOptions = options.Client().ApplyURI("mongodb://localhost:27017")

var Client, err = mongo.Connect(context.Background(), clientOptions)