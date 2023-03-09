package main

import (
	"embed"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed frontend/dist
var assets embed.FS

type UIHandler struct {
	http.Handler
	e *echo.Echo
}

func (h *UIHandler) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	//fmt.Println("Call UIHandler ServeHTTP:", req.Method, req.URL.Path)
	fmt.Println("Call UIHandler ServeHTTP:", req.Method, req.URL.Path)
	h.e.ServeHTTP(rw, req)
}

func main() {
	// Create an instance of the app structure
	app := NewApp()

	e := echo.New()
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
	g := e.Group("/ui")
	g.POST("/login", handleLogin)

	uiHandler := &UIHandler{e: e}
	// Create application with options
	err := wails.Run(&options.App{
		Title:  "mcui",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets:  assets,
			Handler: uiHandler,
		},
		OnStartup:  app.startup,
		OnDomReady: app.OnDomReady,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err)
	}
}

func handleLogin(c echo.Context) error {
	fmt.Println("handleLogin called now")
	return c.HTML(200, "<p>login called</p>")
}
