export function make(): string {
  const s = `


VERSION := \`curl -s https://api.github.com/repos/cdr/code-server/releases/latest | grep -oP '"tag_name": "\\K(.*)(?=")'\`
.PHONY: download
download:
\t@echo $(VERSION)
\twget https://github.com/cdr/code-server/releases/download/$(VERSION)/code-server-$(VERSION)-linux-x86_64.tar.gz
\ttar -xvzf code-server-$(VERSION)-linux-x86_64.tar.gz
\trm -f code-server-$(VERSION)-linux-x86_64.tar.gz
\tmv code-server-$(VERSION)-linux-x86_64 code-server
\tcd code-server


`
  return s
}
