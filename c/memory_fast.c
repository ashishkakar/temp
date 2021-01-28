//sort while searching
//walk for free to check double free
//Debug mode

#ifndef MEMORY_H
#define MEMORY_H
#include "memory.h"
#endif

int init_memory() {
	memory[0]=-2; //next
	memory[1]=2; //first/last free
	memory[2]=0; //next
	memory[3]=2; //next free
	memory[4]=2; //last free
	return 0;
}

int *allocate_memory(int size, int *status) {
	int current=memory[1];
	if(size<2) {
		size=2;
	}
	do {
		if(memory[memory[current]]>=0) {
			
			if(memory[memory[current]+2]!=memory[current]) {
				memory[memory[memory[current]+2]+1] = current;
			}
			if(memory[memory[current]+1]!=memory[current]) {
				memory[memory[memory[current]+1]+2] = current;
			}
			if(memory[1]==memory[current]) {
				if(memory[memory[current]+1]!=memory[1]) {
					memory[1] = memory[memory[current]+1];
				} else if(memory[memory[current]+2]!=memory[1]) {
					memory[1] = memory[memory[current]+2];
				} else {
					//error
				}
			}
			memory[current]=memory[memory[current]];
			continue;
		}
		if((memory[current]==0?MEMALLOC:memory[current])>i+size+3) {
			memory[current+size+1] = memory[current];
			
			memory[current+size+2] = memory[current+1];
			memory[current+size+3] = memory[current+2];
			if(memory[current+2]!=current) {
				memory[memory[current+2]+1] = current+size+1;
			}
			if(memory[current+1]!=current) {
				memory[memory[current+1]+2] = current+size+1;
			}
			
			if(memory[1]==current) {
				if(memory[current+size+2]==memory[1]) {
					memory[current+size+2]=current+size+1;
				}
				if(memory[current+size+3]==memory[1]) {
					memory[current+size+3]=current+size+1;
				}
				memory[1]=current+size+1;
			}
			memory[current] = -(current+size+1);
			*status = 0;
			return memory+current+1;
		} else if((memory[current]==0?MEMALLOC:memory[current])>i+size) {
			if(memory[current+2]!=current) {
				memory[memory[current+2]+1] = current+size+2;
			}
			if(memory[current+1]!=current) {
				memory[memory[current+1]+2] = current+size+3;
			}
			if(memory[1]==current) {
				if(memory[current+1]!=memory[1]) {
					memory[1] = memory[current+1];
				} else if(memory[current+2]!=memory[1]) {
					memory[1] = memory[current+2];
				} else {
					//error
				}
			}
			memory[current] = -(current+size+1);
			*status = 0;
			return memory+current+1;
		}
		current = memory[current+1];
	} while(current!=memory[1] && current>=0 && current<MEMALLOC);
	*status = 1;
	return 0;
}

int free_memory(int *p) {
	p--;
	*p = -(*p);
	return 0;
}
