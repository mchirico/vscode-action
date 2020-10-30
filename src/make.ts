export function make(): string {
  const s = `

VERSION := v3.6.1

.PHONY: download
download:
\t@echo $(VERSION)
\twget https://github.com/cdr/code-server/releases/download/$(VERSION)/code-server-3.6.1-linux-amd64.tar.gz
\ttar -xvzf code-server-3.6.1-linux-amd64.tar.gz
\trm -f code-server-3.6.1-linux-amd64.tar.gz
\tmv code-server-3.6.1-linux-amd64 code-server
\tcd code-server


.PHONY: downloadNgrok
downloadNgrok:
\tcurl -LO https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-386.zip
\tunzip ngrok-stable-linux-386.zip
\trm ngrok-stable-linux-386.zip


.PHONY: start_code_server
start_code_server:
\tsudo -u root $(CODESVR) --bind-addr 127.0.0.1:$(PORT) --auth none &


.PHONY: sleep_test
sleep_test:
\tsleep $(T)



.PHONY: run_ngrok
run_ngrok:
\t./ngrok authtoken $(NGROK_TOKEN)
\ttimeout $(duration) ./ngrok http $(PORK)




.PHONY: cleanup
cleanup:
\trm -rf code-server
\trm -rf ngrok-stable-linux-386.zip
\trm -rf ngrok



`
  return s
}
