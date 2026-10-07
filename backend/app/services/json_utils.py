import json
import re


def parse_llm_json(text: str) -> dict:
    cleaned = text.strip()

    if cleaned.startswith("```json"):
        cleaned = cleaned[7:]
    elif cleaned.startswith("```"):
        cleaned = cleaned[3:]

    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]

    cleaned = cleaned.strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as error:
        raise ValueError(
            f"LLM returned invalid JSON: {error}"
        )


def repair_json(text: str) -> dict:
    """Attempts to extract and repair JSON from model output."""
    cleaned = text.strip()

    # Strip code fences
    cleaned = re.sub(r"^```(?:json)?", "", cleaned, flags=re.MULTILINE)
    cleaned = re.sub(r"```$", "", cleaned, flags=re.MULTILINE).strip()

    try:
        return json.loads(cleaned)
    except Exception:
        pass

    # Attempt regex match between outermost braces or brackets
    obj_match = re.search(r"(\{.*\})", cleaned, re.DOTALL)
    if obj_match:
        try:
            return json.loads(obj_match.group(1))
        except Exception:
            pass

    arr_match = re.search(r"(\[.*\])", cleaned, re.DOTALL)
    if arr_match:
        try:
            return json.loads(arr_match.group(1))
        except Exception:
            pass

    return {}

