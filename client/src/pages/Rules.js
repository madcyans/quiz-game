import React from 'react';
import { Link } from 'react-router-dom';

export default function Rules() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Quiz Rules</h1>
      <ul className="list-disc ml-6 space-y-2">
        <li>You will get up to 20 questions.</li>
        <li>Each correct answer scores 1 point.</li>
        <li>On 3 wrong answers the game ends.</li>
        <li>Try to beat your high score!</li>
      </ul>
      <Link
        to="/"
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}