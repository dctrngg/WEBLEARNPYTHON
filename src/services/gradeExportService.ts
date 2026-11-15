/**
 * Grade & Submissions Export Service for Instructors
 * Generates UTF-8 BOM CSV / Excel compatible spreadsheets for electronic gradebooks (VnEdu, SMAS).
 */

import { Assignment, Submission, UserProfile } from "../types/ide";

export interface GradeSummaryRow {
  index: number;
  username: string;
  fullName: string;
  className: string;
  submittedCount: number;
  passedCount: number;
  totalAssignments: number;
  completionRatePercent: number;
  gradeScale10: number;
  verdict: string;
  tabSwitchesCount: number;
  assignmentDetails: Record<string, string>; // asgnId -> "ĐẠT" | "CHƯA ĐẠT" | "CHƯA NỘP"
}

/**
 * Computes consolidated grade rows for a given class or all classes
 */
export function computeClassGradeSummary(
  targetClass: string,
  students: UserProfile[],
  assignments: Assignment[],
  submissions: Submission[]
): GradeSummaryRow[] {
  const filteredStudents =
    targetClass === "ALL"
      ? students
      : students.filter((s) => (s.className || "").trim() === targetClass.trim());

  // Map submissions by `${userId}_${assignmentId}`
  const subMap = new Map<string, Submission>();
  submissions.forEach((s) => {
    subMap.set(`${s.userId}_${s.assignmentId}`, s);
  });

  return filteredStudents.map((stu, idx) => {
    let submittedCount = 0;
    let passedCount = 0;
    let totalTabSwitches = 0;
    const assignmentDetails: Record<string, string> = {};

    assignments.forEach((asgn) => {
      const sub = subMap.get(`${stu.uid}_${asgn.id}`);
      if (sub) {
        submittedCount++;
        if (sub.tabSwitchesCount) {
          totalTabSwitches += sub.tabSwitchesCount;
        }
        if (sub.status === "passed") {
          passedCount++;
          assignmentDetails[asgn.id] = "ĐẠT";
        } else {
          assignmentDetails[asgn.id] = "CHƯA ĐẠT";
        }
      } else {
        assignmentDetails[asgn.id] = "CHƯA NỘP";
      }
    });

    const totalAsgn = assignments.length || 1;
    const completionRate = Math.round((passedCount / totalAsgn) * 100);
    // Grade scale 10: rounded to 1 decimal place (e.g. 8.5)
    const gradeScale10 = Math.round((passedCount / totalAsgn) * 100) / 10;
    const verdict = gradeScale10 >= 5 ? "ĐẠT YÊU CẦU" : "CHƯA ĐẠT";

    return {
      index: idx + 1,
      username: stu.username || stu.uid.replace(/^usr_/, ""),
      fullName: stu.displayName || "Học sinh",
      className: stu.className || targetClass,
      submittedCount,
      passedCount,
      totalAssignments: assignments.length,
      completionRatePercent: completionRate,
      gradeScale10,
      verdict,
      tabSwitchesCount: totalTabSwitches,
      assignmentDetails,
    };
  });
}

/**
 * Exports grade table to a clean CSV file with UTF-8 BOM encoding for direct Excel / VnEdu import
 */
export function exportGradesToCSV(
  targetClass: string,
  students: UserProfile[],
  assignments: Assignment[],
  submissions: Submission[]
): void {
  const summaryRows = computeClassGradeSummary(
    targetClass,
    students,
    assignments,
    submissions
  );

  // CSV Headers
  const baseHeaders = [
    "STT",
    "Mã Học Sinh / Tên Đăng Nhập",
    "Họ và Tên",
    "Lớp",
    "Số Bài Đã Nộp",
    "Số Bài Đạt",
    "Tổng Số Bài",
    "Tỷ Lệ Hoàn Thành (%)",
    "Điểm Thang 10 (Quy đổi)",
    "Đánh Giá (VnEdu/SMAS)",
    "Cảnh Báo Chuyển Tab (Lần)",
  ];

  const asgnHeaders = assignments.map((a) => `[${a.id}] ${a.title.replace(/,/g, " ")}`);
  const fullHeaders = [...baseHeaders, ...asgnHeaders];

  // CSV Rows
  const csvLines: string[] = [];
  csvLines.push(fullHeaders.map((h) => `"${h}"`).join(","));

  summaryRows.forEach((row) => {
    const baseCols = [
      row.index,
      `"${row.username}"`,
      `"${row.fullName}"`,
      `"${row.className}"`,
      row.submittedCount,
      row.passedCount,
      row.totalAssignments,
      `"${row.completionRatePercent}%"`,
      row.gradeScale10.toFixed(1),
      `"${row.verdict}"`,
      row.tabSwitchesCount,
    ];

    const asgnCols = assignments.map((a) => `"${row.assignmentDetails[a.id] || "CHƯA NỘP"}"`);
    csvLines.push([...baseCols, ...asgnCols].join(","));
  });

  // UTF-8 BOM (\uFEFF) ensures Excel opens Vietnamese accents without mojibake
  const csvContent = "\uFEFF" + csvLines.join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const dateStr = new Date().toISOString().split("T")[0];
  const safeClassName = targetClass === "ALL" ? "Tat_Ca_Cac_Lop" : `Lop_${targetClass}`;
  const filename = `Bang_Diem_Tin_Hoc_10_${safeClassName}_${dateStr}.csv`;

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Detailed assignment breakdown export for instructor records
 */
export function exportGradesDetailedCSV(
  targetClass: string,
  students: UserProfile[],
  assignments: Assignment[],
  submissions: Submission[]
): void {
  exportGradesToCSV(targetClass, students, assignments, submissions);
}
