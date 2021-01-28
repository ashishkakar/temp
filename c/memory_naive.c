#ifndef MEMALLOC
#define MEMALLOC (1024*1024)
#endif

int memory[MEMALLOC];

int init_memory() {
	memory[0]=0;
	return 0;
}

int *allocate_memory(int size, int *status) {
	int i=0;
	while(memory[i]!=0) {
		if(memory[i]>0) {
		if(memory[i]-i>size) {
			if(size+1==memory[i]-i) {
				memory[i] = -memory[i];
				*status=0;
				return memory+i+1;
			} else {
				memory[i+size+1] = memory[i];
				memory[i] = -(i+size+1);
				*status=0;
				return memory+i+1;
			}
		} else if(memory[memory[i]]>0) {
			memory[i] = memory[memory[i]];
			continue;
		} else {
			i = memory[i];
		}
		} else {
			i = -memory[i];
		}
	}
	if(MEMALLOC-i > size+1) {
		memory[i] = -(i+size+1);
		memory[i+size+1] = 0;
		*status=0;
		return memory+i+1;
	}
	*status=1;
	return 0;
}

int free_memory(int *p) {
	p--;
	*p = -(*p);
	return 0;
}
