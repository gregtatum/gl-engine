function GlamMeta() {
	this.name = ""
	this.children = []
}

export default function createMeta() {
	return new GlamMeta()
}