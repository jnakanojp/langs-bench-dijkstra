
class PriorityQueue {
	constructor() {
		this.tree = []
	}

	isPrior(i, j) {
		return this.tree[i][0] < this.tree[j][0]
	}

	Empty() {
		return this.tree.length === 0
	}

	swap(i, j) {
		[this.tree[i], this.tree[j]] = [this.tree[j], this.tree[i]]
	}

	Push(v) {
		let index = this.tree.length
		this.tree.push(v)
		while (index > 0) {
			const parentIndex = ((index + 1) >> 1) - 1
			if (this.isPrior(index, parentIndex)) {
				this.swap(index, parentIndex)
				index = parentIndex
			} else {
				break
			}
		}
	}

	Pop() {
		const result = this.tree[0]
		let size = this.tree.length
		this.tree[0] = this.tree.pop()
		size--
		for (let index = 0;;) {
			const child = ((index + 1) << 1) - 1
			if (child >= size) {
				break
			}
			const rIndex = child + 1
			if (rIndex < size && this.isPrior(rIndex, child)) {
				child = rIndex
			}
			if (this.isPrior(index, child)) {
				break
			}
			this.swap(index, child)
			index = child
		}
		return result
	}
}

module.exports = PriorityQueue
