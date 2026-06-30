import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RagAnswer } from './models';

/** When the real Clinical RAG Engine is running locally, point here. */
const RAG_API_URL = 'http://localhost:8000';

@Injectable({ providedIn: 'root' })
export class RagService {
  private http = inject(HttpClient);

  /**
   * Ask a question. In demo mode returns canned, realistic answers so the
   * public deployment works with no backend. In live mode it calls the
   * Clinical RAG Engine HTTP API.
   */
  async ask(question: string, demoMode: boolean): Promise<RagAnswer> {
    if (demoMode) {
      return this.demoAnswer(question);
    }
    return firstValueFrom(
      this.http.post<RagAnswer>(`${RAG_API_URL}/query`, { question }),
    );
  }

  private demoAnswer(question: string): Promise<RagAnswer> {
    const q = question.toLowerCase();
    let answer: RagAnswer;

    if (q.includes('ipertension')) {
      answer = {
        answer:
          'I pazienti con ipertensione arteriosa essenziale sono trattati ' +
          'principalmente con Ramipril 5mg. Nei casi con comorbidità cardiaca ' +
          'si associa Amlodipina 5mg. [S1][S2]',
        sources: [
          { id: 'S1', score: 2.18, text: 'ANAMNESI: Paziente di 42 anni, sesso M, cefalea persistente. DIAGNOSI: Ipertensione arteriosa essenziale. TERAPIA: Ramipril 5mg.' },
          { id: 'S2', score: 1.6, text: 'ANAMNESI: Paziente di 69 anni, sesso F, astenia, dispnea. DIAGNOSI: Ipertensione + scompenso. TERAPIA: Amlodipina 5mg, Ramipril 5mg.' },
        ],
      };
    } else if (q.includes('diabete')) {
      answer = {
        answer:
          'Il diabete mellito tipo 2 è la diagnosi più frequente nel dataset. ' +
          'La terapia di prima linea documentata è Metformina 850mg. [S1]',
        sources: [
          { id: 'S1', score: 1.94, text: 'ANAMNESI: Paziente di 71 anni, sesso M, poliuria, astenia. DIAGNOSI: Diabete mellito tipo 2. TERAPIA: Metformina 850mg.' },
        ],
      };
    } else {
      answer = {
        answer:
          'Le diagnosi più frequenti nel dataset clinico sintetico sono: ' +
          'Diabete mellito tipo 2, Scompenso cardiaco cronico e Dislipidemia. ' +
          'Ogni risposta è ancorata ai documenti recuperati. [S1]',
        sources: [
          { id: 'S1', score: 1.71, text: 'ANAMNESI: Paziente di 62 anni, sesso M, edemi declivi. DIAGNOSI: Scompenso cardiaco cronico. TERAPIA: Bisoprololo 2.5mg.' },
        ],
      };
    }

    // Simulate retrieval + generation latency.
    return new Promise((resolve) => setTimeout(() => resolve(answer), 700));
  }
}
