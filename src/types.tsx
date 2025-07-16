export interface ChildRowData {
    id: string;
    parentId: string;
    childName: string;
    quantity: number;
    // ... other child-specific properties
}
  
export interface ParentRowData {
    id: string;
    name: string;
    total: number;
    children: ChildRowData[]; // Array of child data
    // ... other parent-specific properties
}

