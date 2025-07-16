export interface ChildRowData {
    childId: string;
    parentId: string;
    childName: string;
    quantity: number;
    // ... other child-specific properties
}
  
export interface ParentRowData {
    parentId: string;
    parentName: string;
    total: number;
    children: ChildRowData[]; // Array of child data
    // ... other parent-specific properties
}

