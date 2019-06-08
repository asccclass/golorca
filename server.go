package main

import (
   "fmt"
   "log"
   "net"
   "net/http"
   "os"
   "os/signal"

   "github.com/zserge/lorca"
)

func main() {
   ui, err := lorca.New("", "", 1024, 768)
   if err != nil {
      log.Fatal(err)
   }
   defer ui.Close()

   ui.Bind("start", func() {
      log.Println("UI is ready")
   })

   ln, err := net.Listen("tcp", "127.0.0.1:0")
   if err != nil {
      log.Fatal(err)
   }
   defer ln.Close()
   FS := http.Dir("./www")
   go http.Serve(ln, http.FileServer(FS))
   ui.Load(fmt.Sprintf("http://%s", ln.Addr()))

   sigc := make(chan os.Signal)
   signal.Notify(sigc, os.Interrupt)
   select {
   case <-sigc:
   case <-ui.Done():
   }
   log.Println("exiting...")
}
