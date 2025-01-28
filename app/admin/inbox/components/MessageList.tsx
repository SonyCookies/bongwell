"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  MessageSquare,
  Calendar,
  ChevronDown,
  ChevronUp,
  Phone,
  Check,
  X,
  Edit,
  Filter,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase-config";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  date: Date;
  read: boolean;
  contacted: boolean;
  notes: string;
}

export default function MessageList() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [expandedSubmissionId, setExpandedSubmissionId] = useState<
    string | null
  >(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    "all" | "unread" | "read" | "contacted" | "not-contacted"
  >("all");

  useEffect(() => {
    const q = query(collection(db, "submissions"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const submissionsData: Submission[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.toDate(),
          } as Submission)
      );
      setSubmissions(submissionsData);
    });

    return () => unsubscribe();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedSubmissionId((prevId) => (prevId === id ? null : id));
  };

  const toggleReadStatus = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const submissionRef = doc(db, "submissions", id);
    const submission = submissions.find((sub) => sub.id === id);
    if (submission) {
      await updateDoc(submissionRef, {
        read: !submission.read,
      });
    }
  };

  const toggleContacted = async (id: string) => {
    const submissionRef = doc(db, "submissions", id);
    const submission = submissions.find((sub) => sub.id === id);
    if (submission) {
      await updateDoc(submissionRef, {
        contacted: !submission.contacted,
      });
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    const submissionRef = doc(db, "submissions", id);
    await updateDoc(submissionRef, { notes });
    setEditingNotes(null);
  };

  const filteredSubmissions = submissions.filter((submission) => {
    switch (filter) {
      case "unread":
        return !submission.read;
      case "read":
        return submission.read;
      case "contacted":
        return submission.contacted;
      case "not-contacted":
        return !submission.contacted;
      default:
        return true;
    }
  });

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Submissions
        </h2>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="border rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="contacted">Contacted</option>
            <option value="not-contacted">Not Contacted</option>
          </select>
        </div>
      </div>
      {filteredSubmissions.map((submission) => (
        <div
          key={submission.id}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
            expandedSubmissionId === submission.id ? "ring-2 ring-primary" : ""
          }`}
        >
          <div
            className="p-4 cursor-pointer"
            onClick={() => toggleExpand(submission.id)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <User className="w-6 h-6 text-gray-400" />
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      submission.read
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {submission.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {submission.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!submission.read && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                {submission.contacted && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Contacted
                  </span>
                )}
                <button
                  onClick={(e) => toggleReadStatus(submission.id, e)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {submission.read ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {expandedSubmissionId === submission.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span>{submission.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span>{submission.date.toLocaleDateString()}</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-800 dark:text-gray-200 line-clamp-2">
              {submission.message}
            </p>
          </div>
          <AnimatePresence>
            {expandedSubmissionId === submission.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          Address:
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-200 pl-7">
                        {submission.address}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          Message:
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-200 pl-7">
                        {submission.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Contacted:
                      </span>
                      <button
                        onClick={() => toggleContacted(submission.id)}
                        className={`p-1 rounded-full ${
                          submission.contacted ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {submission.contacted ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <X className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Read:
                      </span>
                      <button
                        onClick={(e) => toggleReadStatus(submission.id, e)}
                        className={`p-1 rounded-full ${
                          submission.read ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {submission.read ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <X className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Notes:
                      </span>
                      {editingNotes !== submission.id && (
                        <button
                          onClick={() => setEditingNotes(submission.id)}
                          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {editingNotes === submission.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={submission.notes}
                          onChange={(e) => {
                            const newNotes = e.target.value;
                            setSubmissions(
                              submissions.map((sub) =>
                                sub.id === submission.id
                                  ? { ...sub, notes: newNotes }
                                  : sub
                              )
                            );
                          }}
                          className="flex-grow p-2 border rounded text-gray-800 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          onClick={() =>
                            updateNotes(submission.id, submission.notes)
                          }
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        {submission.notes || "No notes added yet."}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
