"use client";

import { useState, useEffect, useCallback } from "react";
import { studentService, type StudentListParams } from "@/services/admin/studentService";
import type { Student, UpdateStudentInput } from "@/types/admin/student";

type Pagination = {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
};

export function useStudents(filters: StudentListParams = {}) {
  const [students,   setStudents]   = useState<Student[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.list(filters);
      setStudents(data.students);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const updateStudent = async (id: string, input: UpdateStudentInput) => {
    const data = await studentService.update(id, input);
    await fetchStudents();
    return data;
  };

  const deleteStudent = async (id: string) => {
    await studentService.delete(id);
    await fetchStudents();
  };

  return {
    students,
    pagination,
    loading,
    error,
    refetch:       fetchStudents,
    updateStudent,
    deleteStudent,
  };
}
