import { Component, signal, inject, viewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RagService } from './rag.service';
import { ChatMessage } from './models';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private rag = inject(RagService);
  private scrollArea = viewChild<ElementRef<HTMLElement>>('scrollArea');

  protected readonly messages = signal<ChatMessage[]>([]);
  protected readonly loading = signal(false);
  protected readonly demoMode = signal(true);
  protected readonly copiedIndex = signal<number | null>(null);
  protected inputText = '';

  protected readonly examples = [
    'Quali pazienti presentano ipertensione e quale terapia è stata prescritta?',
    'Qual è la terapia di prima linea per il diabete tipo 2?',
    'Quali sono le diagnosi più frequenti nel dataset?',
  ];

  protected toggleMode(): void {
    this.demoMode.update((v) => !v);
  }

  protected newChat(): void {
    this.messages.set([]);
    this.inputText = '';
    this.copiedIndex.set(null);
  }

  protected useExample(question: string): void {
    this.inputText = question;
    this.send();
  }

  protected onKeydown(event: KeyboardEvent): void {
    // Enter sends; Shift+Enter inserts a newline.
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  protected async copy(text: string, index: number): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copiedIndex.set(index);
      setTimeout(() => this.copiedIndex.set(null), 1500);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  }

  protected async send(): Promise<void> {
    const question = this.inputText.trim();
    if (!question || this.loading()) {
      return;
    }

    this.messages.update((m) => [...m, { role: 'user', text: question }]);
    this.inputText = '';
    this.loading.set(true);
    this.scrollToBottom();

    try {
      const res = await this.rag.ask(question, this.demoMode());
      this.messages.update((m) => [
        ...m,
        { role: 'assistant', text: res.answer, sources: res.sources },
      ]);
    } catch {
      this.messages.update((m) => [
        ...m,
        {
          role: 'assistant',
          text:
            'Impossibile raggiungere il motore RAG. Attiva la modalità Demo, ' +
            'oppure avvia il Clinical RAG Engine su localhost:8000.',
        },
      ]);
    } finally {
      this.loading.set(false);
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.scrollArea()?.nativeElement;
      if (el) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    }, 0);
  }
}
