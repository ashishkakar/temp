#ifndef MEMALLOC
#define MEMALLOC (1024*1024)
#endif

int memory[MEMALLOC];

int init_memory();

int *allocate_memory(int size, int *status);

int free_memory(int *p);
