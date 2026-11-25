import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  subscribeToSubmissions,
  getAssignments,
} from "../services/firestoreService";
import { PYTHON_CURRICULUM_LESSONS } from "../services/curriculumData";
import { Assignment, Submission } from "../types/ide";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export const ProjectorPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("ALL");
  const [selectedLesson, setSelectedLesson] = useState<string>("ALL");
  const [spotlightSubmission, setSpotlightSubmission] = useState<Submission | null>(null);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Countdown Practice Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(600); // Default 10 mins
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [initialTimerSetting, setInitialTimerSetting] = useState<number>(600);

  // Load assignments once
  useEffect(() => {
    getAssignments().then(setAssignments);
  }, []);

  // Subscribe to live submissions feed
  useEffect(() => {
    const unsubscribe = subscribeToSubmissions((list) => {
      setSubmissions(list);
    });
    return () => unsubscribe();
  }, []);

  // Timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  // Fullscreen toggle handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleSetTimer = (minutes: number) => {
    const secs = minutes * 60;
    setInitialTimerSetting(secs);
    setTimerSeconds(secs);
    setIsTimerRunning(true);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Distinct classes list
  const classesList = useMemo(() => {
    const set = new Set<string>();
    submissions.forEach((s) => {
      if (s.userClassName) set.add(s.userClassName);
    });
    return Array.from(set).sort();
  }, [submissions]);

  // Assignment lookup map
  const assignmentMap = useMemo(() => {
    const map = new Map<string, Assignment>();
    assignments.forEach((a) => map.set(a.id, a));
    return map;
  }, [assignments]);

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      if (selectedClass !== "ALL" && s.userClassName !== selectedClass) return false;
      if (selectedLesson !== "ALL") {
        const asgn = assignmentMap.get(s.assignmentId);
        if (asgn?.lessonId !== selectedLesson) return false;
      }
      return true;
    });
  }, [submissions, selectedClass, selectedLesson, assignmentMap]);

  // Real-time Class Leaderboard
  const leaderboard = useMemo(() => {
    const userStats = new Map<
      string,
      {
        userId: string;
        name: string;
        className: string;
        passedCount: number;
        totalSubs: number;
        lastActive: string;
      }
    >();

    filteredSubmissions.forEach((s) => {
      const existing = userStats.get(s.userId) || {
        userId: s.userId,
        name: s.userDisplayName || "Học sinh",
        className: s.userClassName || "",
        passedCount: 0,
        totalSubs: 0,
        lastActive: s.updatedAt,
      };

      existing.totalSubs++;
      if (s.status === "passed") existing.passedCount++;
      if (new Date(s.updatedAt) > new Date(existing.lastActive)) {
        existing.lastActive = s.updatedAt;
      }
      userStats.set(s.userId, existing);
    });

    return Array.from(userStats.values())
      .sort((a, b) => b.passedCount - a.passedCount || b.totalSubs - a.totalSubs)
      .slice(0, 10);
  }, [filteredSubmissions]);

  // KPIs
  const totalSubmissions = filteredSubmissions.length;
  const passedSubmissions = filteredSubmissions.filter((s) => s.status === "passed").length;
  const passRate = totalSubmissions > 0 ? Math.round((passedSubmissions / totalSubmissions) * 100) : 0;
  const uniqueStudents = new Set(filteredSubmissions.map((s) => s.userId)).size;

  return (
    <div className="min-h-screen bg-background text-primary font-mono select-none flex flex-col p-4 sm:p-6 space-y-4">
      {/* 1. Projector Top Bar */}
      <header className="border border-grid bg-surface p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-brand text-white font-bold text-xl">
            📺
          </span>
          <div>
            <h1 className="font-bold text-base sm:text-lg text-primary tracking-tight flex items-center gap-2">
              <span>PHÒNG HỌC TIN HỌC 10 // CHẾ ĐỘ MÁY CHIẾU LỚP HỌC</span>
              <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/40 text-emerald-500 text-[11px] font-semibold animate-pulse">
                ● LIVE REAL-TIME
              </span>
            </h1>
            <p className="text-xs text-secondary">
              Màn hình truyền phát trực tiếp tiến độ làm bài & vinh danh học sinh nộp bài
            </p>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Lọc Lớp học */}
          <div className="flex items-center border border-grid bg-subtle px-2 py-1 gap-1.5 text-xs">
            <span className="text-secondary font-semibold">Lớp:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-transparent text-primary font-bold focus:outline-none cursor-pointer"
            >
              <option value="ALL">TẤT CẢ CÁC LỚP ({classesList.length})</option>
              {classesList.map((c) => (
                <option key={c} value={c} className="bg-surface text-primary">
                  LỚP {c}
                </option>
              ))}
            </select>
          </div>

          {/* Lọc Bài học */}
          <div className="flex items-center border border-grid bg-subtle px-2 py-1 gap-1.5 text-xs">
            <span className="text-secondary font-semibold">Bài:</span>
            <select
              value={selectedLesson}
              onChange={(e) => setSelectedLesson(e.target.value)}
              className="bg-transparent text-primary font-bold focus:outline-none cursor-pointer"
            >
              <option value="ALL">TẤT CẢ BÀI HỌC</option>
              {PYTHON_CURRICULUM_LESSONS.map((l) => (
                <option key={l.id} value={l.id} className="bg-surface text-primary">
                  {l.code} - {l.titleVi}
                </option>
              ))}
            </select>
          </div>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            title="Bật/Tắt chế độ Toàn màn hình máy chiếu (F11)"
            className="px-3 py-1.5 bg-subtle border border-grid hover:border-brand text-primary font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>⛶</span>
            <span>{isFullscreen ? "THU NHỎ" : "TOÀN MÀN HÌNH"}</span>
          </button>

          {/* Theme Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="px-2.5 py-1.5 bg-subtle border border-grid hover:border-brand text-secondary hover:text-primary text-xs font-semibold transition-colors"
          >
            {theme === "dark" ? "[◐] TỐI" : "[○] SÁNG"}
          </button>

          {/* Exit / Return */}
          <Link
            to="/admin"
            className="px-3 py-1.5 bg-brand text-white font-bold text-xs hover:opacity-90 transition-opacity"
          >
            ◀ VỀ QUẢN TRỊ
          </Link>
        </div>
      </header>

      {/* 2. Top Banner: Countdown Practice Timer & Live Class KPIs */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Countdown Timer (5 cols) */}
        <div className="lg:col-span-5 border border-grid bg-surface p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-brand font-bold text-sm">⏱</span>
              <span className="font-bold text-xs text-primary tracking-wide">
                ĐỒNG HỒ ĐẾM NGƯỢC THỜI GIAN THỰC HÀNH
              </span>
            </div>
            {timerSeconds === 0 && (
              <span className="px-2 py-0.5 bg-rose-500 text-white font-bold text-[11px] animate-bounce">
                HẾT GIỜ LÀM BÀI!
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div
              className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                timerSeconds <= 60 && timerSeconds > 0
                  ? "text-rose-500 animate-pulse"
                  : timerSeconds === 0
                  ? "text-rose-500"
                  : "text-brand"
              }`}
            >
              {formatTimer(timerSeconds)}
            </div>

            {/* Quick Timer Controls */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => handleSetTimer(5)}
                  className="px-2 py-1 bg-subtle border border-grid hover:border-brand text-secondary hover:text-primary font-bold"
                >
                  5 Phút
                </button>
                <button
                  type="button"
                  onClick={() => handleSetTimer(10)}
                  className="px-2 py-1 bg-subtle border border-grid hover:border-brand text-secondary hover:text-primary font-bold"
                >
                  10 Phút
                </button>
                <button
                  type="button"
                  onClick={() => handleSetTimer(15)}
                  className="px-2 py-1 bg-subtle border border-grid hover:border-brand text-secondary hover:text-primary font-bold"
                >
                  15 Phút
                </button>
                <button
                  type="button"
                  onClick={() => handleSetTimer(20)}
                  className="px-2 py-1 bg-subtle border border-grid hover:border-brand text-secondary hover:text-primary font-bold"
                >
                  20 Phút
                </button>
              </div>

              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 py-1 font-bold text-center border transition-colors ${
                    isTimerRunning
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-600 hover:bg-amber-500 hover:text-white"
                      : "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-500"
                  }`}
                >
                  {isTimerRunning ? "⏸ TẠM DỪNG" : "▶ BẮT ĐẦU"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(initialTimerSetting);
                  }}
                  className="px-3 py-1 bg-subtle border border-grid hover:border-brand text-secondary hover:text-primary font-bold"
                >
                  ↺ ĐẶT LẠI
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Class KPI Cards (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="border border-grid bg-surface p-3 flex flex-col justify-between">
            <span className="text-[11px] text-secondary font-semibold">
              HỌC SINH THAM GIA
            </span>
            <div className="text-3xl font-extrabold text-primary mt-1">
              {uniqueStudents}
            </div>
            <span className="text-[10px] text-muted">học sinh đang làm bài</span>
          </div>

          <div className="border border-grid bg-surface p-3 flex flex-col justify-between">
            <span className="text-[11px] text-secondary font-semibold">
              LƯỢT NỘP BÀI
            </span>
            <div className="text-3xl font-extrabold text-brand mt-1">
              {totalSubmissions}
            </div>
            <span className="text-[10px] text-muted">lần submit ghi nhận</span>
          </div>

          <div className="border border-grid bg-surface p-3 flex flex-col justify-between">
            <span className="text-[11px] text-secondary font-semibold">
              BÀI ĐẠT (PASSED)
            </span>
            <div className="text-3xl font-extrabold text-emerald-500 mt-1">
              {passedSubmissions}
            </div>
            <span className="text-[10px] text-muted">bài làm đúng 100% test</span>
          </div>

          <div className="border border-grid bg-surface p-3 flex flex-col justify-between">
            <span className="text-[11px] text-secondary font-semibold">
              TỶ LỆ ĐẠT CHUẨN
            </span>
            <div className="text-3xl font-extrabold text-primary mt-1">
              {passRate}%
            </div>
            <span className="text-[10px] text-muted">tổng tỷ lệ test cases</span>
          </div>
        </div>
      </section>

      {/* 3. Main 2-Column Split: Live Classroom Feed (Left) & Leaderboard (Right) */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left Column: Real-time Live Submission Feed (7 cols) */}
        <div className="lg:col-span-7 border border-grid bg-surface flex flex-col shadow-sm">
          <div className="h-11 px-4 border-b border-grid bg-subtle flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-brand font-bold">⚡</span>
              <h2 className="font-bold text-xs sm:text-sm text-primary">
                DÒNG HOẠT ĐỘNG NỘP BÀI THỜI GIAN THỰC (LIVE STREAM)
              </h2>
            </div>
            <span className="text-xs text-muted">
              {filteredSubmissions.length} bài nộp
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[calc(100vh-340px)]">
            {filteredSubmissions.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-secondary space-y-2">
                <span className="text-3xl">💻</span>
                <div className="font-bold text-primary text-sm">
                  Đang chờ các bạn học sinh nộp bài...
                </div>
                <p className="text-xs max-w-sm">
                  Khi học sinh bấm [NỘP BÀI & CHẤM ĐIỂM] trong phòng thực hành, bài làm sẽ lập tức xuất hiện tại đây theo thời gian thực.
                </p>
              </div>
            ) : (
              filteredSubmissions.map((sub, idx) => {
                const asgn = assignmentMap.get(sub.assignmentId);
                const isPassed = sub.status === "passed";
                const isRecent = idx === 0;

                return (
                  <div
                    key={sub.id}
                    className={`p-3 border transition-all flex flex-wrap items-center justify-between gap-3 ${
                      isRecent
                        ? "bg-brand/5 border-brand/50 shadow-md ring-1 ring-brand/30"
                        : "bg-surface border-grid hover:border-brand/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 flex items-center justify-center font-bold text-sm border shrink-0 ${
                          isPassed
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
                            : "bg-brand/10 border-brand text-brand"
                        }`}
                      >
                        {isPassed ? "✓" : "◐"}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary text-xs sm:text-sm">
                            {sub.userDisplayName}
                          </span>
                          {sub.userClassName && (
                            <span className="px-1.5 py-0.2 bg-brand/10 border border-brand/40 text-brand font-bold text-[10px]">
                              {sub.userClassName}
                            </span>
                          )}
                          {isRecent && (
                            <span className="px-1.5 py-0.2 bg-brand text-white font-bold text-[10px] animate-pulse">
                              VỪA NỘP
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-secondary mt-0.5 flex items-center gap-2">
                          <span className="font-semibold text-primary">
                            {asgn?.title || sub.assignmentId}
                          </span>
                          <span>•</span>
                          <span className="text-muted text-[11px]">
                            {new Date(sub.updatedAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 font-bold text-xs border ${
                          isPassed
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-500"
                            : "bg-amber-500/15 border-amber-500/40 text-amber-500"
                        }`}
                      >
                        {isPassed
                          ? `✓ ĐẠT ${sub.passedCount}/${sub.totalCount}`
                          : `◐ ${sub.passedCount}/${sub.totalCount} TEST`}
                      </span>

                      <button
                        type="button"
                        onClick={() => setSpotlightSubmission(sub)}
                        title="Chiếu bài làm của học sinh này lên toàn màn hình"
                        className="px-2.5 py-1 bg-subtle border border-grid hover:border-brand hover:text-brand text-primary font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <span>👁</span>
                        <span>CHIẾU CODE</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Live Class Leaderboard (5 cols) */}
        <div className="lg:col-span-5 border border-grid bg-surface flex flex-col shadow-sm">
          <div className="h-11 px-4 border-b border-grid bg-subtle flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">🏆</span>
              <h2 className="font-bold text-xs sm:text-sm text-primary">
                BẢNG VÀNG VINH DANH TIẾT HỌC (LEADERBOARD)
              </h2>
            </div>
            <span className="text-xs text-muted">TOP 10</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[calc(100vh-340px)]">
            {leaderboard.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-secondary">
                <span className="text-3xl mb-2">🥇</span>
                <span className="text-xs">Chưa có dữ liệu xếp hạng tiết học</span>
              </div>
            ) : (
              leaderboard.map((student, idx) => {
                const rank = idx + 1;
                const medal =
                  rank === 1
                    ? "🥇"
                    : rank === 2
                    ? "🥈"
                    : rank === 3
                    ? "🥉"
                    : `#${rank}`;

                return (
                  <div
                    key={student.userId}
                    className={`p-3 border flex items-center justify-between gap-3 ${
                      rank === 1
                        ? "bg-amber-500/10 border-amber-500/40"
                        : rank === 2
                        ? "bg-slate-300/10 border-slate-300/40"
                        : rank === 3
                        ? "bg-orange-600/10 border-orange-600/40"
                        : "bg-surface border-grid"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 text-center font-bold text-base shrink-0">
                        {medal}
                      </div>

                      <div>
                        <div className="font-bold text-primary text-xs sm:text-sm">
                          {student.name}
                        </div>
                        <div className="text-[11px] text-muted flex items-center gap-2">
                          {student.className && (
                            <span className="font-semibold text-secondary">
                              Lớp {student.className}
                            </span>
                          )}
                          <span>•</span>
                          <span>{student.totalSubs} lượt nộp</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-extrabold text-emerald-500">
                        {student.passedCount} BÀI ĐẠT
                      </div>
                      <div className="text-[10px] text-muted">
                        Lúc {new Date(student.lastActive).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* 4. Code Spotlight Modal (Chiếu bài làm của học sinh lên máy chiếu) */}
      {spotlightSubmission && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-8">
          <div className="bg-surface border-2 border-brand w-full max-w-4xl max-h-[90vh] flex flex-col font-mono text-xs shadow-2xl">
            {/* Modal Header */}
            <div className="h-14 px-6 border-b border-grid bg-subtle flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="p-1.5 bg-brand text-white font-bold text-base">
                  👨‍💻
                </span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-primary">
                    BÀI LÀM: {spotlightSubmission.userDisplayName}{" "}
                    {spotlightSubmission.userClassName && (
                      <span className="text-brand">({spotlightSubmission.userClassName})</span>
                    )}
                  </h3>
                  <p className="text-xs text-secondary">
                    {assignmentMap.get(spotlightSubmission.assignmentId)?.title ||
                      spotlightSubmission.assignmentId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 font-bold text-xs border ${
                    spotlightSubmission.status === "passed"
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-500"
                      : "bg-amber-500/15 border-amber-500/40 text-amber-500"
                  }`}
                >
                  {spotlightSubmission.status === "passed"
                    ? `✓ ĐẠT ${spotlightSubmission.passedCount}/${spotlightSubmission.totalCount}`
                    : `◐ ${spotlightSubmission.passedCount}/${spotlightSubmission.totalCount} TEST`}
                </span>

                <button
                  type="button"
                  onClick={() => setSpotlightSubmission(null)}
                  className="px-3 py-1 bg-surface border border-grid text-secondary hover:text-brand font-bold text-sm"
                >
                  ✕ ĐÓNG
                </button>
              </div>
            </div>

            {/* Modal Body: Large Code Display */}
            <div className="flex-1 overflow-y-auto p-6 bg-terminal text-sm leading-relaxed space-y-4">
              <div className="text-xs text-muted border-b border-grid pb-2 flex items-center justify-between">
                <span>🐍 Mã nguồn Python bài làm (Chiếu trên máy chiếu)</span>
                <span>Nộp lúc: {new Date(spotlightSubmission.updatedAt).toLocaleTimeString()}</span>
              </div>

              <pre className="font-mono text-base text-primary whitespace-pre-wrap selection:bg-brand/30">
                {spotlightSubmission.code}
              </pre>

              {spotlightSubmission.lastExecutedOutput && (
                <div className="mt-4 pt-4 border-t border-grid">
                  <div className="text-xs font-semibold text-secondary mb-1">
                    Kết quả thực thi (Console Output):
                  </div>
                  <pre className="p-3 bg-surface border border-grid text-xs text-emerald-500 whitespace-pre-wrap">
                    {spotlightSubmission.lastExecutedOutput}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="h-12 px-6 border-t border-grid bg-subtle flex items-center justify-between shrink-0">
              <span className="text-xs text-secondary">
                💡 Giáo viên có thể trình chiếu bài này để cùng cả lớp phân tích và nhận xét.
              </span>
              <button
                type="button"
                onClick={() => setSpotlightSubmission(null)}
                className="px-4 py-1.5 bg-brand text-white font-bold hover:opacity-90 transition-opacity"
              >
                HOÀN TẤT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
