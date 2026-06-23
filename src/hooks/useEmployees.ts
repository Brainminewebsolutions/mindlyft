"use client";

import { useState, useEffect, useCallback } from "react";
import { employeeService, type EmployeeListParams } from "@/services/admin/employeeService";
import type { Employee } from "@/types/admin/employee";

type Pagination = {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
};

export function useEmployees(filters: EmployeeListParams = {}) {
  const [employees,  setEmployees]  = useState<Employee[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await employeeService.list(filters);
      setEmployees(data.employees);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  const deleteEmployee = async (id: string) => {
    await employeeService.delete(id);
    await fetchEmployees();
  };

  return {
    employees,
    pagination,
    loading,
    error,
    refetch:       fetchEmployees,
    deleteEmployee,
  };
}
